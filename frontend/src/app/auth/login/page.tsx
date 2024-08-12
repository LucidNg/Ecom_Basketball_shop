import Link from 'next/link';
import React from 'react';

export default function Login() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-base-content">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Elevate Your Game: Customize Gear and Dominate the Court! 
                    Welcome to the ultimate destination for basketball enthusiasts! Here, you can discover high-quality basketball products such as balls, 
                    jerseys, shoes, and training equipment. Especially, we provide a convenient 
                    jersey design tool, allowing you to easily personalize uniforms for your team. 
                    Whether you&apos;re an individual player or a team, we are here to accompany you
                    in raising your game. Explore today!
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-accent transition transition-duration-300 transition-property:scale,box-shadow,background-color hover:scale-105 hover:drop-shadow-xl">Login</button>
                        </div>
                        <div className="divider text-base-content">Or</div>
                        <div className="form-control">
                            <button type="button" className="btn btn-secondary transition transition-duration-300 transition-property:scale,box-shadow,background-color hover:scale-105 hover:drop-shadow-xl"><Link href="/auth/register">Create a new account</Link></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
