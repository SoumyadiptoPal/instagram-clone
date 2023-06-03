import { Users } from "./users";

export const Posts=[
    {
        imageUrl:"https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww&w=1000&q=80",
        user: Users[0].user,
        likes: 7870,
        caption: "Trip to Kanchanganga with family and friends",
        profile_picture: Users[0].image,
        comments:[
            {
                user:"samrat",
                comment: "Wow!! Thats Amazing"
            },
            {
                user: "user2",
                comment: "Enjoy your trip"
            }
        ], 
    },
    {
        imageUrl:"https://www.shutterstock.com/image-photo/amazing-autumn-sunrise-hintersee-lake-260nw-747646747.jpg",
        user: Users[2].user,
        likes: 5625,
        caption: "Enjoying Summer vaccation at Switzerland",
        profile_picture: Users[2].image,
        comments:[
            {
                user:"user4",
                comment: "Wow!! Thats Amazing"
            },
            {
                user: "user1",
                comment: "Enjoy your trip"
            }
        ], 
    }
]