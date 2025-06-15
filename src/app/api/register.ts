// import { hash } from "bcryptjs"
// import { NextResponse } from "next/server"


// export async function POST(req: Request) {
//   try {
//     const { email, password, name } = await req.json()

//     const existingUser = await prisma.user.findUnique({ where: { email } })
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       )
//     }

//     const hashedPassword = await hash(password, 10)

//     await prisma.user.create({
//       data: { email, name, password: hashedPassword },
//     })

//     return NextResponse.json({ message: "User created" }, { status: 201 })
//   } catch (err) {
//     return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
//   }
// }
