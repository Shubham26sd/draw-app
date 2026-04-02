"use client"
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 m-2 bg-white rounded">
        <div className="p-2">
          <input
            className="text-background"
            type="text"
            placeholder="Email"
          ></input>
        </div>

        <div className="p-2">
          <input
            className="text-background"
            type="password"
            placeholder="Password"
          ></input>
        </div>

        <div className="p-2">
          <button
            className="text-black"
            onClick={() => {
              console.log("Hi there")
            }}
          >
            {isSignin ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}
