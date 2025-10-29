import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { ConferenceRegistration } from './models/conferenceRegistration.model.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '../.env') });

const testData = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        
        if (!mongoUri) {
            console.error('❌ MONGO_URI not found in environment variables');
            console.log('Looking for .env at:', path.join(__dirname, '../.env'));
            
            // Try reading .env file directly
            try {
                const fs = await import('fs');
                const envPath = path.join(__dirname, '../.env');
                const envContent = fs.readFileSync(envPath, 'utf8');
                console.log('\n.env file contents:');
                console.log(envContent);
            } catch (err) {
                console.log('Could not read .env file:', err.message);
            }
            
            process.exit(1);
        }

        console.log('✅ MONGO_URI found');
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        const registrations = await ConferenceRegistration.find({}).lean();
        
        console.log('\n=== TOTAL REGISTRATIONS ===');
        console.log('Count:', registrations.length);

        if (registrations.length === 0) {
            console.log('No registrations found!');
            process.exit(0);
        }

        console.log('\n=== RAW DATA FROM MONGODB ===');
        console.log(JSON.stringify(registrations, null, 2));

        console.log('\n=== CHECKING SPECIFIC REGISTRATION ===');
        const reg = registrations[0];
        console.log('ID:', reg._id);
        console.log('userInfo:', reg.userInfo);
        console.log('userInfo.fullName:', reg.userInfo?.fullName);
        console.log('userInfo.email:', reg.userInfo?.email);
        console.log('conferenceInfo:', reg.conferenceInfo);
        console.log('conferenceInfo.name:', reg.conferenceInfo?.name);
        console.log('status:', reg.status);

        // Test with virtuals
        const regWithVirtuals = await ConferenceRegistration.findById(reg._id);
        console.log('\n=== WITH VIRTUALS ===');
        console.log('userName virtual:', regWithVirtuals.userName);
        console.log('userEmail virtual:', regWithVirtuals.userEmail);
        console.log('conferenceName virtual:', regWithVirtuals.conferenceName);
        console.log('toJSON:', JSON.stringify(regWithVirtuals.toJSON(), null, 2));

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

testData();