import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Student from '../models/Student.js';
import Guardian from '../models/Guardian.js';
import StudentGuardian from '../models/StudentGuardian.js';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Connect to database
    await connectDatabase();

    // Clear existing data
    console.log('Clearing existing data...');
    await Student.deleteMany({});
    await Guardian.deleteMany({});
    await StudentGuardian.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Create students
    console.log('Creating students...');
    const students = await Student.insertMany([
      {
        firstName: 'Jorge',
        lastName: 'Lascano',
        birthDate: new Date('2019-09-04'),
        gender: 'Male',
        address: 'Gonzalo Montesdeoca',
        phone: '0987326319',
        email: 'elascano@espe.edu.ec',
        enrollmentDate: new Date('2023-05-12'),
        isActive: true,
        medicalInfo: 'No allergies',
        emergencyContact: 'Ana Perez',
        emergencyPhone: '0987654321'
      },
      {
        firstName: 'María',
        lastName: 'González',
        birthDate: new Date('2018-03-15'),
        gender: 'Female',
        address: 'Av. Principal 456',
        phone: '0987654321',
        email: 'mgonzalez@email.com',
        enrollmentDate: new Date('2022-09-01'),
        isActive: true,
        medicalInfo: 'Asthma',
        emergencyContact: 'Carlos González',
        emergencyPhone: '0987111222'
      },
      {
        firstName: 'Pedro',
        lastName: 'Ramírez',
        birthDate: new Date('2020-07-22'),
        gender: 'Male',
        address: 'Calle Secundaria 789',
        phone: '0983456789',
        email: 'pramirez@email.com',
        enrollmentDate: new Date('2024-01-15'),
        isActive: true,
        medicalInfo: 'None',
        emergencyContact: 'Laura Ramírez',
        emergencyPhone: '0983222333'
      }
    ]);
    console.log(`✓ Created ${students.length} students\n`);

    // Create guardians
    console.log('Creating guardians...');
    const guardians = await Guardian.insertMany([
      {
        firstName: 'Ana',
        lastName: 'Perez',
        relationship: 'Mother',
        phone: '0987654321',
        email: 'ana.perez@email.com',
        address: 'Gonzalo Montesdeoca',
        occupation: 'Teacher',
        workPhone: '023456789',
        isActive: true,
        isEmergencyContact: true,
        isAuthorizedPickup: true
      },
      {
        firstName: 'Luis',
        lastName: 'Lascano',
        relationship: 'Father',
        phone: '0987326319',
        email: 'luis.lascano@email.com',
        address: 'Gonzalo Montesdeoca',
        occupation: 'Engineer',
        workPhone: '023456790',
        isActive: true,
        isEmergencyContact: true,
        isAuthorizedPickup: true
      },
      {
        firstName: 'Carlos',
        lastName: 'González',
        relationship: 'Father',
        phone: '0987111222',
        email: 'carlos.gonzalez@email.com',
        address: 'Av. Principal 456',
        occupation: 'Doctor',
        workPhone: '023111222',
        isActive: true,
        isEmergencyContact: true,
        isAuthorizedPickup: true
      },
      {
        firstName: 'Laura',
        lastName: 'Ramírez',
        relationship: 'Mother',
        phone: '0983222333',
        email: 'laura.ramirez@email.com',
        address: 'Calle Secundaria 789',
        occupation: 'Nurse',
        workPhone: '023222333',
        isActive: true,
        isEmergencyContact: true,
        isAuthorizedPickup: true
      }
    ]);
    console.log(`✓ Created ${guardians.length} guardians\n`);

    // Create relationships
    console.log('Creating student-guardian relationships...');
    const relationships = await StudentGuardian.insertMany([
      // Jorge Lascano -> Ana Perez (Mother), Luis Lascano (Father)
      {
        studentId: students[0]._id,
        guardianId: guardians[0]._id,
        relationship: 'Mother',
        isPrimary: true,
        priority: 1
      },
      {
        studentId: students[0]._id,
        guardianId: guardians[1]._id,
        relationship: 'Father',
        isPrimary: false,
        priority: 2
      },
      // María González -> Carlos González (Father)
      {
        studentId: students[1]._id,
        guardianId: guardians[2]._id,
        relationship: 'Father',
        isPrimary: true,
        priority: 1
      },
      // Pedro Ramírez -> Laura Ramírez (Mother)
      {
        studentId: students[2]._id,
        guardianId: guardians[3]._id,
        relationship: 'Mother',
        isPrimary: true,
        priority: 1
      }
    ]);
    console.log(`✓ Created ${relationships.length} relationships\n`);

    // Display summary
    console.log('═══════════════════════════════════════');
    console.log('📊 Database Seeded Successfully!');
    console.log('═══════════════════════════════════════');
    console.log(`Students created: ${students.length}`);
    console.log(`Guardians created: ${guardians.length}`);
    console.log(`Relationships created: ${relationships.length}`);
    console.log('');
    console.log('Student IDs for testing:');
    students.forEach((student, index) => {
      console.log(`  ${index + 1}. ${student.firstName} ${student.lastName}: ${student._id}`);
    });
    console.log('');
    console.log('Guardian IDs for testing:');
    guardians.forEach((guardian, index) => {
      console.log(`  ${index + 1}. ${guardian.firstName} ${guardian.lastName}: ${guardian._id}`);
    });
    console.log('═══════════════════════════════════════\n');

    // Close connection
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
