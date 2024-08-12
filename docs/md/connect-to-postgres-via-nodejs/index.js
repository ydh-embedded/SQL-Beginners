import postgres from "postgres";

const sql = postgres("postgres://danny:r2d2c3po@rocky:5432/deathstar");

const users = await sql`
    select * from public."User";
`;

console.log(users)

await sql.end()




