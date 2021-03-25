export function fetchCalendar() {
    const departmentTeams = {
        id: 1,
        teams: [
            {
                name: 'Frontend Team',
                percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
                members: [
                    {
                        name: 'FE_Team_User1',
                        vacations: [
                            { startDate: '20.03.2021', endDate: '22.03.2021', type: 'Paid' },
                            { startDate: '03.02.2021', endDate: '05.02.2021', type: 'Paid' },
                        ],
                    },
                    {
                        name: 'FE_Team_User2',
                        vacations: [
                            { startDate: '03.03.2021', endDate: '05.03.2021', type: 'UnPaid' },
                            { startDate: '02.04.2021', endDate: '05.04.2021', type: 'UnPaid' },
                        ],
                    },
                ],
            },
            {
                name: 'Backend Team',
                percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
                members: [
                    {
                        name: 'BE_Team_User1',
                        vacations: [
                            { startDate: '15.02.2021', endDate: '22.02.2021', type: 'Paid' },
                            { startDate: '06.03.2021', endDate: '09.03.2021', type: 'UnPaid' },
                        ],
                    },
                    {
                        name: 'BE_Team_User2',
                        vacations: [
                            { startDate: '26.04.2021', endDate: '29.04.2021', type: 'UnPaid' },
                            { startDate: '17.03.2021', endDate: '20.03.2021', type: 'UnPaid' },
                        ],
                    },
                ],
            },
            {
                name: 'Designers Team',
                percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
                members: [
                    {
                        name: 'DE_Team_User1',
                        vacations: [
                            { startDate: '15.04.2021', endDate: '22.04.2021', type: 'UnPaid' },
                            { startDate: '10.02.2021', endDate: '14.02.2021', type: 'Paid' },
                        ],
                    },
                    {
                        name: 'DE_Team_User2',
                        vacations: [
                            { startDate: '20.03.2021', endDate: '22.03.2021', type: 'UnPaid' },
                            { startDate: '20.03.2020', endDate: '22.03.2020', type: 'UnPaid' },
                        ],
                    },
                ],
            },
            {
                name: 'PM Team',
                percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
                members: [
                    {
                        name: 'PM_Team_User1',
                        vacations: [
                            { startDate: '01.03.2021', endDate: '03.03.2021', type: 'UnPaid' },
                            { startDate: '20.03.2020', endDate: '22.03.2020', type: 'Paid' },
                        ],
                    },
                    {
                        name: 'PM_Team_User2',
                        vacations: [
                            { startDate: '05.03.2021', endDate: '07.03.2021', type: 'Paid' },
                            { startDate: '10.04.2021', endDate: '14.04.2021', type: 'UnPaid' },
                        ],
                    },
                ],
            },
            {
                name: 'DevOps Team',
                percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
                members: [
                    {
                        name: 'DE_Team_User1',
                        vacations: [
                            { startDate: '24.03.2021', endDate: '26.03.2021', type: 'UnPaid' },
                            { startDate: '20.02.2021', endDate: '22.02.2021', type: 'Paid' },
                        ],
                    },
                    {
                        name: 'DE_Team_User2',
                        vacations: [
                            { startDate: '08.03.2021', endDate: '10.03.2021', type: 'Paid' },
                            { startDate: '20.04.2021', endDate: '22.04.2021', type: 'UnPaid' },
                        ],
                    },
                ],
            },
        ],
    };
    return fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: JSON.stringify(departmentTeams),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .catch(err => console.log(err));
}
