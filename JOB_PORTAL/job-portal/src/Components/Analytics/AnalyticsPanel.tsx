import { Card, Text, Title, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUniversityStats } from "../../Services/AnalyticsService";

const AnalyticsPanel = () => {
    const profile = useSelector((state: any) => state.profile);
    const [stats, setStats] = useState({
        totalStudents: 0,
        verifiedStudents: 0,
        studentsWithApplications: 0,
        studentsHired: 0
    });

    useEffect(() => {
        if (profile?.university) {
            getUniversityStats(profile.university).then(setStats).catch(console.error);
        }
    }, [profile.university]);

    return (
        <div className="p-5">
            <Title order={2}>Аналитика университета</Title>
            <SimpleGrid cols={2} spacing="lg" mt="xl">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="lg">👨‍🎓 Всего студентов</Text>
                    <Title>{stats.totalStudents}</Title>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="lg">✅ Проверенные студенты</Text>
                    <Title>{stats.verifiedStudents}</Title>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="lg">📨 Студенты с откликами</Text>
                    <Title>{stats.studentsWithApplications}</Title>
                </Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Text size="lg">🎉 Принятые студенты</Text>
                    <Title>{stats.studentsHired}</Title>
                </Card>
            </SimpleGrid>
        </div>
    );
};

export default AnalyticsPanel;
