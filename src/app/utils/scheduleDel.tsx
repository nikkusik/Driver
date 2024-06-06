import { useEffect, useState } from 'react';
import axios from 'axios';

const SchedulePage = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get('/api/schedule');
                setSchedule(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSchedule();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/schedule/${id}`);
            const updatedSchedule = schedule.filter((item: any) => item.id !== id);
            setSchedule(updatedSchedule);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Schedule</h1>
            <ul>
                {schedule.map((item: any) => (
                    <li key={item.id} className="mb-4">
                        <span>{item.student} - {item.teacher} - {item.car} - {item.startDateTime}</span>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SchedulePage;
