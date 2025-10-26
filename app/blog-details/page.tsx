// import { useEffect } from 'react';
"use client";

import React, { useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import AOS from 'aos';
import 'aos/dist/aos.css';

// 1. Define the props interface for the Icon component
interface IconProps {
	path: string | string[]; // path can be a single string or an array of strings
	viewBox?: string;
	className?: string;
}

// 2. Update the Icon component to use the defined props interface
const Icon: React.FC<IconProps> = ({ path, viewBox = "0 0 40 40", className = "" }) => (
	<svg
		className={className}
		width="40"
		height="40"
		viewBox={viewBox}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{Array.isArray(path) ? path.map((d, index) => (
			<path
				key={index}
				d={d}
				fill="currentColor"
				fillOpacity="0.9"
				// Simplified logic for stroke properties based on inclusion in path string
				stroke={d.includes('stroke=') ? 'currentColor' : undefined}
				strokeWidth={d.includes('stroke-width="2"') ? '2' : undefined}
				strokeLinecap={d.includes('stroke-linecap="round"') ? 'round' : undefined}
				strokeLinejoin={d.includes('stroke-linejoin="round"') ? 'round' : undefined}
			/>
		)) : <path d={path} fill="currentColor" fillOpacity="0.9" />}
	</svg>
);


export default function BlogDetails() {
	// Initialize AOS for animations
	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true,
		});
		AOS.refresh();
	}, []);

	// Simplified SVG paths for cleaner JSX
	const socialIcons = {
		facebook: "M21.6696 29.6667V21.1658H24.7102L25.1622 17.8374H21.6696V15.7174C21.6696 14.7569 21.9533 14.0993 23.4148 14.0993H25.2667V11.1319C24.3656 11.0408 23.4599 10.9968 22.5537 11.0002C19.8661 11.0002 18.0208 12.5477 18.0208 15.3886V17.8312H15V21.1595H18.0274V29.6667H21.6696Z",
		twitter: "M28.3333 14.8346L26.5833 15.1421L27.75 13.6045L25.7083 14.2196C23.0833 11.1444 19 14.5271 20.1667 17.2947C15.5 17.2947 13.1667 13.6045 13.1667 13.6045C13.1667 13.6045 11.4167 16.3722 14.3333 18.5248L12.5833 17.9098C12.5833 19.7549 13.75 20.9849 15.7917 21.6H13.75C14.9167 24.0601 16.9583 24.0601 16.9583 24.0601C16.9583 24.0601 15.2083 25.5977 12 25.5977C21.625 30.518 27.4583 21.2925 26.5833 16.3722L28.3333 14.8346ZM16.9621 23.5601L16.9616 23.5601L16.9621 23.5601Z M17.288 24.4361C17.2882 24.4359 17.2884 24.4357 16.9583 24.0601L17.2884 24.4357L18.2849 23.5601L16.9615 23.5601L16.9548 23.5599C16.9464 23.5596 16.9311 23.5588 16.9095 23.557C16.8663 23.5535 16.7985 23.5459 16.7113 23.5299C16.5366 23.4979 16.287 23.4326 16.0038 23.2999C15.5807 23.1016 15.0686 22.7467 14.6146 22.1H15.7917L15.9359 21.1212C14.9741 20.8315 14.2633 20.41 13.7955 19.8839C13.4837 19.5332 13.2674 19.1224 13.1604 18.6426L14.1675 18.9965L14.6302 18.1225C13.3207 17.156 13.0939 16.0977 13.1548 15.2953C13.1748 15.0316 13.2268 14.7897 13.2888 14.5819C13.5959 14.9376 14.0349 15.3898 14.6065 15.8418C15.8369 16.8147 17.6929 17.7947 20.1667 17.7947H20.92L20.6274 17.1005C20.1642 16.0016 20.7255 14.6983 21.7942 13.9813C22.3149 13.6319 22.921 13.4521 23.5221 13.5111C24.1148 13.5693 24.7473 13.8638 25.328 14.5442L25.54 14.7925L25.8526 14.6983L26.4228 14.5265L26.185 14.8399L25.4147 15.8551L26.6642 15.6356L26.2533 15.9966L26.0417 16.1824L26.0911 16.4597C26.4932 18.7211 25.3417 22.0921 22.8939 24.3042C21.683 25.3986 20.1702 26.1933 18.3966 26.4282C17.08 26.6026 15.6004 26.471 13.9715 25.9035C14.7405 25.7473 15.3828 25.5163 15.8906 25.2834C16.3373 25.0787 16.6799 24.8727 16.9139 24.7152C17.031 24.6364 17.1211 24.5696 17.1836 24.521C17.2149 24.4967 17.2393 24.477 17.2568 24.4625L17.2778 24.4449L17.2844 24.4392L17.2867 24.4372L17.2876 24.4364L17.288 24.4361ZM16.9621 23.5601L16.9616 23.5601L16.9621 23.5601Z",
		whatsapp: [
			"M20.1646 12H20.1687C24.6716 12 28.3333 15.6638 28.3333 20.1667C28.3333 24.6696 24.6716 28.3333 20.1687 28.3333C18.5078 28.3333 16.9674 27.8393 15.676 26.9838L12.537 27.9873L13.5547 24.9534C12.5758 23.6089 12 21.9531 12 20.1667C12 15.6628 15.6617 12 20.1646 12ZM23.318 24.685C23.9417 24.5502 24.7237 24.0888 24.9207 23.5325C25.1177 22.9751 25.1177 22.5004 25.0606 22.3994C25.0144 22.3192 24.9053 22.2666 24.7423 22.1882C24.6999 22.1677 24.6538 22.1455 24.6043 22.1207C24.3644 22.0012 23.1976 21.4245 22.9771 21.3479C22.7606 21.2662 22.5544 21.2948 22.3911 21.5255C22.36 21.569 22.329 21.6126 22.2982 21.656C22.1012 21.9331 21.9111 22.2004 21.7531 22.3708C21.6091 22.5239 21.3744 22.5433 21.1773 22.4616C21.1559 22.4527 21.1312 22.4427 21.1037 22.4316C20.7917 22.3056 20.0998 22.0261 19.2622 21.2805C18.5558 20.6517 18.076 19.8687 17.9372 19.6339C17.8009 19.3984 17.9185 19.2603 18.0271 19.1326C18.0292 19.1303 18.0312 19.1279 18.0332 19.1255C18.1032 19.0389 18.1712 18.9667 18.2395 18.8941C18.2887 18.8419 18.338 18.7896 18.3884 18.7315C18.3959 18.7229 18.4032 18.7145 18.4103 18.7063C18.5173 18.5833 18.581 18.51 18.6528 18.3569C18.7345 18.1986 18.6763 18.0353 18.6181 17.9148C18.5781 17.8305 18.3308 17.2304 18.1185 16.7153C18.0276 16.4949 17.9432 16.29 17.8841 16.1478C17.7259 15.769 17.6054 15.7547 17.3655 15.7445C17.3582 15.7442 17.3508 15.7438 17.3433 15.7434C17.2674 15.7396 17.1839 15.7354 17.092 15.7354C16.7796 15.7354 16.4539 15.8272 16.2569 16.0283C16.25 16.0354 16.2429 16.0427 16.2354 16.0502C15.9834 16.3066 15.4219 16.8776 15.4219 18.0159C15.4219 19.1564 16.2311 20.2601 16.3808 20.4643C16.3849 20.47 16.3886 20.4749 16.3917 20.4792C16.4007 20.491 16.4177 20.5156 16.4424 20.5514C16.7481 20.9941 18.2372 23.1505 20.4576 24.0705C22.3339 24.8483 22.8913 24.7759 23.318 24.685Z",
			"M26.5003 21.8655V26.5H24.6009V22.4499V22.4436C24.6009 21.9238 24.6009 21.2074 24.3689 20.6216C24.2467 20.3131 24.0518 20.0158 23.7411 19.799C23.4292 19.5815 23.0434 19.4748 22.5918 19.4748C22.1495 19.4748 21.7646 19.5614 21.441 19.7405C21.1146 19.9213 20.8806 20.1797 20.7179 20.4748C20.4054 21.0414 20.3514 21.7532 20.3514 22.3718V26.5H18.452V18.1529H20.2358V18.9279V19.4279H20.7358H20.7764H21.0779L21.2186 19.1613C21.5238 18.583 22.3047 17.9185 23.5227 17.9185C24.8682 17.9185 25.5525 18.3507 25.94 18.9662C26.3609 19.6348 26.5003 20.62 26.5003 21.8655ZM15.6338 26.5H13.7313V18.1529H15.6338V26.5ZM14.681 15.8779C14.0351 15.8779 13.5 15.3391 13.5 14.681C13.5 14.3678 13.6244 14.0674 13.8459 13.8459C14.0674 13.6244 14.3678 13.5 14.681 13.5C14.9942 13.5 15.2946 13.6244 15.5161 13.8459C15.7375 14.0674 15.8619 14.3678 15.8619 14.681C15.8619 15.3391 15.3266 15.8779 14.681 15.8779Z"
		],
		linkedin: "M16.1338 27H13.2313V17.6529H16.1338V27ZM14.681 16.3779C13.7528 16.3779 13 15.6091 13 14.681C13 14.2352 13.1771 13.8076 13.4923 13.4923C13.8076 13.1771 14.2352 13 14.681 13C15.1268 13 15.5544 13.1771 15.8696 13.4923C16.1848 13.8076 16.3619 14.2352 16.3619 14.681C16.3619 15.6091 15.6088 16.3779 14.681 16.3779ZM26.9972 27H24.1009V22.4499C24.1009 21.3655 24.079 19.9748 22.5918 19.9748C21.0827 19.9748 20.8514 21.153 20.8514 22.3718V27H17.952V17.6529H20.7358V18.9279H20.7764C21.1639 18.1936 22.1105 17.4185 23.5227 17.4185C26.4603 17.4185 27.0003 19.353 27.0003 21.8655V27H26.9972Z",
		link: [
			"M18.332 20.833C18.6899 21.3114 19.1465 21.7073 19.6708 21.9938C20.1952 22.2802 20.775 22.4506 21.3709 22.4933C21.9669 22.5359 22.565 22.45 23.1248 22.2411C23.6846 22.0323 24.193 21.7055 24.6154 21.283L27.1154 18.783C27.8744 17.9971 28.2943 16.9446 28.2848 15.8521C28.2753 14.7597 27.8371 13.7146 27.0646 12.9421C26.2921 12.1695 25.247 11.7313 24.1545 11.7218C23.062 11.7123 22.0095 12.1323 21.2237 12.8913L19.7904 14.3163",
			"M21.6659 19.167C21.308 18.6886 20.8514 18.2927 20.3271 18.0062C19.8027 17.7198 19.2229 17.5494 18.627 17.5067C18.031 17.4641 17.4329 17.55 16.8731 17.7589C16.3133 17.9677 15.8049 18.2945 15.3825 18.717L12.8825 21.217C12.1235 22.0029 11.7036 23.0554 11.713 24.1479C11.7225 25.2403 12.1607 26.2854 12.9333 27.0579C13.7058 27.8305 14.7509 28.2687 15.8434 28.2782C16.9358 28.2877 17.9883 27.8677 18.7742 27.1087L20.1992 25.6837"
		],
		heart: "M27.3671 13.8417C26.9415 13.4159 26.4361 13.0781 25.8799 12.8476C25.3237 12.6172 24.7275 12.4985 24.1254 12.4985C23.5234 12.4985 22.9272 12.6172 22.371 12.8476C21.8147 13.0781 21.3094 13.4159 20.8838 13.8417L20.0004 14.7251L19.1171 13.8417C18.2573 12.982 17.0913 12.499 15.8754 12.499C14.6596 12.499 13.4935 12.982 12.6338 13.8417C11.774 14.7015 11.291 15.8675 11.291 17.0834C11.291 18.2993 11.774 19.4653 12.6338 20.3251L13.5171 21.2084L20.0004 27.6917L26.4838 21.2084L27.3671 20.3251C27.7929 19.8994 28.1307 19.3941 28.3612 18.8379C28.5917 18.2816 28.7103 17.6855 28.7103 17.0834C28.7103 16.4813 28.5917 15.8851 28.3612 15.3289C28.1307 14.7727 27.7929 14.2674 27.3671 13.8417V13.8417Z",
	};

	const readMoreArrow = [
		"M30.8839 9.11612C31.372 9.60427 31.372 10.3957 30.8839 10.8839L10.8839 30.8839C10.3957 31.372 9.60427 31.372 9.11612 30.8839C8.62796 30.3957 8.62796 29.6043 9.11612 29.1161L29.1161 9.11612C29.6043 8.62796 30.3957 8.62796 30.8839 9.11612Z",
		"M12.5 10C12.5 9.30964 13.0596 8.75 13.75 8.75H30C30.6904 8.75 31.25 9.30964 31.25 10V26.25C31.25 26.9404 30.6904 27.5 30 27.5C29.3096 27.5 28.75 26.9404 28.75 26.25V11.25H13.75C13.0596 11.25 12.5 10.6904 12.5 10Z"
	];


	return (
		<div className="overflow-x-hidden">
			<>
				<Meta
					title="Designing for User Experience in 2025 | Sajjat Mujawar Portfolio"
					description="Explore the latest trends in UX design and learn how to create interfaces that delight users. Insights by Sajjat Mujawar, Senior Creative Designer."
					image="/images/blog/blog-og.png"
					url="https://www.yourwebsite.com/blog-details"
				/>
				{/* Header Start */}
				<Header />
				<main className="pt-[80px]">

					{/* Hero Section Start */}
					<section className="bg-secondary pt-20">
						<div className="max-w-[1075px] mx-auto banner-contents" data-aos="flip-down" data-aos-delay="300">
							<div className="grid grid-cols-1">
								<h4 className="text-dark font-bold font-Syne leading-snug banner-title max-w-[950px] mb-12 text-[2.5rem]">
									Designing the perfect feature comparison table
								</h4>
								<div className="w-full rounded-[20px] mb-9 overflow-hidden">
									<Image
										className="w-full h-auto object-cover"
										src="/images/blog-details/banner2.png" // Path corrected to /
										alt="banner"
										width={1075}
										height={500}
										priority
									/>
								</div>
							</div>
						</div>
					</section>
					{/* Hero Section End */}

					{/* Blog Details Content Start */}
					<section className="bg-white blog-details-section pb-120 md:pb-[120px] pt-12">
						<div className="max-w-[1075px] mx-auto px-4 sm:px-6 lg:px-8">

							{/* Author/Meta Info */}
							<div className="grid grid-cols-1 mb-12">
								<ul className="flex flex-wrap items-center space-x-8 lg:space-x-16 list-none p-0 m-0 blog-clients-info">
									{/* Author */}
									<li className="flex gap-3 items-start">
										<Image
											className="align-self-start"
											src="/images/blog-details/user.png" // Path corrected to /
											alt="user image"
											width={40}
											height={40}
										/>
										<div className="flex flex-col gap-1">
											<span className="clients-info-text text-sm font-normal font-Inter leading-tight">Written by</span>
											<h2 className="text-dark text-[15px] font-bold font-sans leading-none">Sajjat Mujawar</h2>
										</div>
									</li>
									{/* Category */}
									<li className="flex flex-col gap-1">
										<span className="clients-info-text text-sm font-normal font-Inter leading-tight">Category</span>
										<h4 className="text-dark text-[15px] font-bold font-sans leading-none">User Experience</h4>
									</li>
									{/* Date */}
									<li className="flex flex-col gap-1">
										<span className="clients-info-text text-sm font-normal font-Inter leading-tight">Date</span>
										<h4 className="text-dark text-[15px] font-bold font-sans leading-none">02/08/2023</h4>
									</li>
								</ul>
							</div>

							{/* Main Content */}
							<div className="grid grid-cols-1">
								<h3 className="text-2xl font-bold font-Syne leading-10 mb-5">About the position</h3>
								<p className="paragraph mb-12 text-gray-700">Everyone in my team works towards the same goal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize.</p>
								<p className="paragraph mb-12 text-gray-700">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself</p>
								<p className="paragraph mb-12 text-gray-700">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.</p>
							</div>

							{/* Image Row */}
							<div className="flex flex-wrap -mx-2 md:-mx-3 mb-12">
								<div className="w-1/2 px-2 md:px-3">
									<div className="rounded-[20px] overflow-hidden">
										<Image
											className="w-full h-full object-cover"
											src="/images/blog-details/post3.png" // Path corrected to /
											alt="post image"
											width={500}
											height={300}
										/>
									</div>
								</div>
								<div className="w-1/2 px-2 md:px-3">
									<div className="rounded-[20px] overflow-hidden">
										<Image
											className="w-full h-full object-cover"
											src="/images/blog-details/post4.png" // Path corrected to /
											alt="post image"
											width={500}
											height={300}
										/>
									</div>
								</div>
							</div>

							{/* Section 1: Learning the basics */}
							<div className="grid grid-cols-1 gap-6">
								<h3 className="text-2xl font-bold font-Syne leading-10">1. Learning the basics</h3>
								<p className="paragraph text-gray-700">Everyone in my team works towards the same goal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize.</p>
								<p className="paragraph mb-12 text-gray-700">
									But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
								</p>
							</div>

							{/* Section 2: Learning the basics */}
							<div className="grid grid-cols-1 gap-6">
								<h3 className="text-2xl font-bold font-Syne leading-10">2. Learning the basics</h3>
								<p className="paragraph text-gray-700">Everyone in my team works towards the same goal. This enabled our teams to ship new ideas and feel more capable. Podcasting operational — change management inside of workflows. Completely synergize.</p>
								<p className="paragraph text-gray-700">
									But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
								</p>

								{/* Share and Tags */}
								<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mt-6">
									{/* Share Links */}
									<div className="flex gap-4 items-center">
										<span className="text-black-text-800 text-sm font-normal font-Inter leading-tight">Share:</span>
										<ul className="flex space-x-2 sm:space-x-4 list-none p-0 m-0">
											<li><a href="#" className="blog-social-link"><Icon path={socialIcons.facebook} /></a></li>
											<li><a href="#" className="blog-social-link"><Icon path={socialIcons.twitter} /></a></li>
											<li><a href="#" className="blog-social-link"><Icon path={socialIcons.whatsapp} /></a></li>
											<li><a href="#" className="blog-social-link"><Icon path={socialIcons.link} viewBox="0 0 40 40" /></a></li>
											<li><a href="#" className="blog-social-link"><Icon path={socialIcons.heart} /></a></li>
										</ul>
									</div>
									{/* Tags */}
									<div className="flex flex-wrap gap-2 items-center justify-start md:justify-end">
										<a className="text-xs font-medium font-Inter leading-none px-4 py-2 rounded-[40px] portfolio-tag-link border border-gray-300 hover:bg-gray-100 transition" href="#">APP</a>
										<a className="text-xs font-medium font-Inter leading-none px-4 py-2 rounded-[40px] portfolio-tag-link border border-gray-300 hover:bg-gray-100 transition" href="#">DEVELOPMENT</a>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* Blog Details Content End */}

					{/* Blog Section Start (Related Posts) */}
					<section className="bg-white pb-120 md:pb-[120px]">
						<div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

							<div className="flex justify-center">
								<div className="w-full" data-aos="flip-down">
									<div className="font-bold font-Syne text-center leading-none flex flex-col gap-y-2 mb-10">
										<span className="text-warning text-xl">Blog</span>
										<h3 className="section-title text-dark text-4xl sm:text-5xl">
											My blog
											<span className="relative inline-block circle-shape blog-shape-inner">po</span>st
										</h3>
									</div>
								</div>
							</div>

							{/* Layout: Single column on small screens, four columns on large screens. 
                                The .blog-grid class is added for consistency with your CSS snippet, assuming it targets lg: sizes. 
                            */}
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 blog-grid">

								{/* Blog Item 1 */}
								<div className="blog-item" data-aos="fade-up">
									<div className="rounded-[20px] overflow-hidden mb-6">
										<Image
											className="w-full h-auto object-cover"
											src="/images/blog/blog1.png" // Path corrected to /
											alt="blog image"
											width={1200}
											height={500}
										/>
									</div>
									<div className="flex flex-col gap-3">
										<ul className="flex flex-wrap text-sm font-normal font-Inter leading-tight list-none p-0 m-0">
											<li className="blog-meta-item pr-4 border-r border-gray-300 mr-4">
												<Link href="#">UI Design</Link>
											</li>
											<li className="blog-meta-item">
												<Link href="#">03 May 2019</Link>
											</li>
										</ul>
										<div className="flex justify-between items-end text-dark blog-title-section">
											<h4 className="font-bold font-Syne transition-all leading-8 blog-title text-xl pr-4">
												<Link href="/blog-details">Right-lo-left behind development in mobile web design</Link>
											</h4>
											<Link href="/blog-details" className="hover:text-primary transition-colors">
												<Icon path={readMoreArrow} className="animate-arrow-up" />
											</Link>
										</div>
									</div>
								</div>

								{/* Blog Item 2 */}
								<div className="blog-item" data-aos="fade-up" data-aos-delay="300">
									<div className="rounded-[20px] overflow-hidden mb-6">
										<Image
											className="w-full h-auto object-cover"
											src="/images/blog/blog2.png" // Path corrected to /
											alt="blog image"
											width={1200}
											height={500}
										/>
									</div>
									<div className="flex flex-col gap-3">
										<ul className="flex flex-wrap text-sm font-normal font-Inter leading-tight list-none p-0 m-0">
											<li className="blog-meta-item pr-4 border-r border-gray-300 mr-4">
												<Link href="#">UI Design</Link>
											</li>
											<li className="blog-meta-item">
												<Link href="#">03 May 2019</Link>
											</li>
										</ul>
										<div className="flex justify-between items-end text-dark blog-title-section">
											<h4 className="font-bold font-Syne transition-all leading-8 blog-title text-xl pr-4">
												<Link href="/blog-details">Connect craft: Reading the smart experience</Link>
											</h4>
											<Link href="/blog-details" className="hover:text-primary transition-colors">
												<Icon path={readMoreArrow} className="animate-arrow-up" />
											</Link>
										</div>
									</div>
								</div>

								{/* Blog Item 3 */}
								<div className="blog-item" data-aos="fade-up" data-aos-delay="500">
									<div className="rounded-[20px] overflow-hidden mb-6">
										<Image
											className="w-full h-auto object-cover"
											src="/images/blog/blog3.png" // Path corrected to /
											alt="blog image"
											width={1200}
											height={500}
										/>
									</div>
									<div className="flex flex-col gap-3">
										<ul className="flex flex-wrap text-sm font-normal font-Inter leading-tight list-none p-0 m-0">
											<li className="blog-meta-item pr-4 border-r border-gray-300 mr-4">
												<Link href="#">UI Design</Link>
											</li>
											<li className="blog-meta-item">
												<Link href="#">03 May 2019</Link>
											</li>
										</ul>
										<div className="flex justify-between items-end text-dark blog-title-section">
											<h4 className="font-bold font-Syne transition-all leading-8 blog-title text-xl pr-4">
												<Link href="/blog-details">Ecoglow: Sustainable skincare a brighter tomorrow</Link>
											</h4>
											<Link href="/blog-details" className="hover:text-primary transition-colors">
												<Icon path={readMoreArrow} className="animate-arrow-up" />
											</Link>
										</div>
									</div>
								</div>

								{/* Blog Item 4 */}
								<div className="blog-item" data-aos="fade-up" data-aos-delay="700">
									<div className="rounded-[20px] overflow-hidden mb-6">
										<Image
											className="w-full h-auto object-cover"
											src="/images/blog/blog4.png" // Path corrected to /
											alt="blog image"
											width={1200}
											height={500}
										/>
									</div>
									<div className="flex flex-col gap-3">
										<ul className="flex flex-wrap text-sm font-normal font-Inter leading-tight list-none p-0 m-0">
											<li className="blog-meta-item pr-4 border-r border-gray-300 mr-4">
												<Link href="#">UI Design</Link>
											</li>
											<li className="blog-meta-item">
												<Link href="#">03 May 2019</Link>
											</li>
										</ul>
										<div className="flex justify-between items-end text-dark blog-title-section">
											<h4 className="font-bold font-Syne transition-all leading-8 blog-title text-xl pr-4">
												<Link href="/blog-details">Right-lo-left behind development in mobile web design</Link>
											</h4>
											<Link href="/blog-details" className="hover:text-primary transition-colors">
												<Icon path={readMoreArrow} className="animate-arrow-up" />
											</Link>
										</div>
									</div>
								</div>

							</div>

						</div>
					</section>
					{/* Blog Section End */}

				</main>
				{/* Footer Start */}
				<Footer />
			</>
		</div>
	);
}