import { Gender, IUser } from '@/model/user';

export const dummyUsers: IUser[] = [
    {
        id: '1',
        name: 'John Doe',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        gender: Gender.MALE,
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-03-20T14:30:00Z'
    },
    {
        id: '2',
        name: 'Jane Smith',
        phone: '+1234567891',
        email: 'jane.smith@example.com',
        gender: Gender.FEMALE,
        status: 'active',
        createdAt: '2024-01-20T09:15:00Z',
        updatedAt: '2024-03-18T16:45:00Z'
    },
    {
        id: '3',
        name: 'Mike Johnson',
        phone: '+1234567892',
        email: 'mike.johnson@example.com',
        gender: Gender.MALE,
        status: 'inactive',
        createdAt: '2024-02-01T14:20:00Z',
        updatedAt: '2024-03-15T11:30:00Z'
    },
    {
        id: '4',
        name: 'Sarah Wilson',
        phone: '+1234567893',
        email: 'sarah.wilson@example.com',
        gender: Gender.FEMALE,
        status: 'active',
        createdAt: '2024-02-10T11:30:00Z',
        updatedAt: '2024-03-22T09:15:00Z'
    },
    {
        id: '5',
        name: 'David Brown',
        phone: '+1234567894',
        email: 'david.brown@example.com',
        gender: Gender.MALE,
        status: 'pending',
        createdAt: '2024-02-15T16:45:00Z',
        updatedAt: '2024-03-25T13:20:00Z'
    },
    {
        id: '6',
        name: 'Lisa Davis',
        phone: '+1234567895',
        email: 'lisa.davis@example.com',
        gender: Gender.FEMALE,
        status: 'active',
        createdAt: '2024-02-20T08:30:00Z',
        updatedAt: '2024-03-28T15:10:00Z'
    },
    {
        id: '7',
        name: 'Robert Miller',
        phone: '+1234567896',
        email: 'robert.miller@example.com',
        gender: Gender.MALE,
        status: 'inactive',
        createdAt: '2024-02-25T12:15:00Z',
        updatedAt: '2024-03-30T10:45:00Z'
    },
    {
        id: '8',
        name: 'Emily Garcia',
        phone: '+1234567897',
        email: 'emily.garcia@example.com',
        gender: Gender.FEMALE,
        status: 'active',
        createdAt: '2024-03-01T15:30:00Z',
        updatedAt: '2024-03-31T14:20:00Z'
    }
];