import { db, storage } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Jobs Collection
export const jobsCollection = collection(db, 'jobs');

// Talents Collection
export const talentsCollection = collection(db, 'talents');

// Applications Collection
export const applicationsCollection = collection(db, 'applications');

export const api = {
    // Jobs
    getJobs: async () => {
        try {
            // Simple query without composite index requirement
            const snapshot = await getDocs(jobsCollection);
            const jobs = snapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            }));
            // Sort in JS instead of Firestore to avoid index requirement
            return jobs.sort((a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds);
        } catch (error) {
            console.error('Firebase getJobs error:', error);
            throw error;
        }
    },

    postJob: async (jobData: any) => {
        const docRef = await addDoc(jobsCollection, {
            ...jobData,
            status: 'approved', // Auto-approve for now (can change to 'pending' for moderation)
            createdAt: Timestamp.now()
        });
        return { _id: docRef.id, ...jobData };
    },

    // Talents
    getTalents: async () => {
        const q = query(talentsCollection, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
    },

    registerTalent: async (formData: FormData) => {
        // Extract data from FormData
        const fullName = formData.get('fullName') as string;
        const phoneNumber = formData.get('phoneNumber') as string;
        const email = formData.get('email') as string;
        const category = formData.get('category') as string;
        const skillsSummary = formData.get('skillsSummary') as string;
        const cvFile = formData.get('cv') as File;

        // Upload CV to Firebase Storage
        let cvUrl = '';
        if (cvFile) {
            const storageRef = ref(storage, `cvs/${Date.now()}_${cvFile.name}`);
            await uploadBytes(storageRef, cvFile);
            cvUrl = await getDownloadURL(storageRef);
        }

        // Save to Firestore
        const docRef = await addDoc(talentsCollection, {
            fullName,
            phoneNumber,
            email,
            category,
            skillsSummary,
            cvPath: cvUrl,
            createdAt: Timestamp.now()
        });

        return { _id: docRef.id };
    },

    submitApplication: async (jobId: string, formData: FormData) => {
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const resumeFile = formData.get('resume') as File;

        let resumeUrl = '';
        if (resumeFile) {
            const storageRef = ref(storage, `applications/${Date.now()}_${resumeFile.name}`);
            await uploadBytes(storageRef, resumeFile);
            resumeUrl = await getDownloadURL(storageRef);
        }

        const docRef = await addDoc(applicationsCollection, {
            jobId,
            fullName,
            email,
            phone,
            resumeUrl,
            status: 'pending',
            createdAt: Timestamp.now()
        });

        return { _id: docRef.id };
    }
};
