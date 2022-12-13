db.createUser(
    {
        user: "dev",
        pwd: "ax2",
        roles: [
            {
                role: "readWrite",
                db: "startcode"
            }
        ]
    }
);