import React, { useContext, useInsertionEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);
	// const isAdmin = true;
	const [isAdmin] = useAdmin();
	const [isInstructor] = useInstructor();

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="md:flex justify-between items-center shadow-md py-3 bg-[#0C4B65]  px-20">
			<div className="flex">
				<img
					className="w-10 h-16 mt-1"
					src="https://i.ibb.co/KV42FCr/musicallogo.png"
					alt=""
				/>
				<h2 className="uppercase text-2xl  text-[#EFCF4F] font-bold">
					Magical <br />
					<span className="text-[#C25934] mt-0 pt-0">Music </span>
				</h2>
			</div>
			<div className="md:flex list-none uppercase text-[#EFCF4F]">
				<li>
					<Link
						className="mr-5 hover:text-[#C25934] font-bold duration-500"
						to="/"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						className="mr-5 hover:text-[#C25934] font-bold duration-500"
						to="/instructors"
					>
						Instructors
					</Link>
				</li>
				<li>
					<Link
						className="mr-5 hover:text-[#C25934] font-bold duration-500"
						to="/classes"
					>
						Classes
					</Link>
				</li>
				<li>
					{user && (
						<Link
							className="mr-5 hover:text-[#C25934] font-bold duration-500"
							to="/dashboard"
						>
							Dashboard
						</Link>
					)}
				</li>
			</div>

			<div className="md:flex justify-center items-center">
				{user && <p className="mr-2">{user?.displayName}</p>}

				{user ? (
					<Link to="/login">
						<button
							onClick={handleLogOut}
							className="py-1 px-3 text-white text-xl duration-700 rounded-md hover:text-[#0C4B65] hover:bg-[#EFCF4F] border border-[#EFCF4F]"
						>
							Log Out
						</button>
					</Link>
				) : (
					<Link to="/login">
						<button className="py-2 px-5 text-white text-2xl duration-700 font-bold rounded-md hover:text-[#0C4B65] hover:bg-[#EFCF4F] bg-[#0C4B65]">
							Log In
						</button>
					</Link>
				)}
				<div>
					{user ? (
						<img
							className="w-12 ml-2 rounded-full"
							src={user?.photoURL}
						/>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
