export const feedUpdate = {
    created: "2020-12-05T08:02:54Z",
    posts: [
        {
            id: 1,
            source: 'YouTube',
            publishTime: '2020-12-05T07:02:54Z',
            title: 'Some New Video',
            description: 'A video description.',
            image: '',
            url: 'https://www.youtube.com/watch?v=8RfWWMMWPy8&ab_channel=PipHareOceanRacing',
            sailorId: 1,
            boatId: 1
        },
        {
            id: 2,
            source: 'YouTube',
            publishTime: '2020-11-05T07:02:54Z',
            title: 'Some New Video 2',
            description: 'A video description.2',
            image: '',
            url: 'https://www.youtube.com/watch?v=AETzg6ACmSc&ab_channel=PipHareOceanRacing',
            sailorId: 1,
            boatId: 1
        }
    ]
}
export const sailorData = {
    created: "2020-12-05T08:02:54Z",
    sailors: [
        {
            id: 1,
            name: 'Pip Hare',
            gender: 'F',
            age: 46,
            boatId: 1
        },
        {
            id: 5,
            name: 'Daniel',
            gender: 'M',
            age: 31,
            boatId: 1
        }
    ]
}

export const boatData = {
    created: "2020-12-05T08:02:54Z",
    boats: [
        {
            id: 1,
            name: 'Medellia',
            flag: 'UK',
            positon: 34
        }
    ]
}