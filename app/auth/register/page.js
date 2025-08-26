"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IoArrowBack, IoCloudUpload } from "react-icons/io5";
import { BiLogoKickstarter } from "react-icons/bi";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const steps = [
	{ id: 1, name: "Select Group" },
	{ id: 2, name: "Personal Info" },
	{ id: 3, name: "Business Info" },
];

// Generate groups 1 to 21
const groups = Array.from({ length: 21 }, (_, i) => ({
	id: i + 1,
	name: `Group ${i + 1}`,
}));

const categories = [
  "PEB Builders",
  "Modular Kitchen Specialists",
  "Waterproofing Contractors",
  "Landscape Architects",
  "Sanitaryware & Bathroom Fittings Suppliers",
  "Smart Home Automation Services",
  "Glass & Aluminium Fabricators",
  "Painting Contractors",
  "Solar Panel Installers",
  "Fire Safety & Fire Fighting Contractors",
];


export default function Register() {
	const [currentStep, setCurrentStep] = useState(1);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [formData, setFormData] = useState({
		// Step 1: Group Selection
		group: "",

		// Step 2: Personal Info
		fullName: "",
		photo: null,
		photoPreview: "",
		mobile: "",
		email: "",

		// Step 3: Business Info
		businessName: "",
		businessCategory: "",
		address: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData((prev) => ({
					...prev,
					photo: file,
					photoPreview: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleNext = () => {
		if (currentStep < 3) {
			setCurrentStep((prev) => prev + 1);
		} else {
			// Submit form
			handleSubmit();
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		console.log("Form submitted:", formData);
		setIsLoading(false);
		// Show success modal
		setShowSuccessModal(true);
		// Navigate to login after 3 seconds
		setTimeout(() => {
			window.location.href = "/auth/login";
		}, 3000);
	};

	const updateFormData = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const isStepValid = () => {
		switch (currentStep) {
			case 1:
				return formData.group !== "";
			case 2:
				return formData.fullName && formData.mobile;
			case 3:
				return (
					formData.businessName &&
					formData.businessCategory &&
					formData.address
				);
			default:
				return false;
		}
	};

	return (
		<main className="min-h-screen bg-background p-6 rounded-3xl ">
			<Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader className="flex flex-col items-center text-center">
						<CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
						<DialogTitle className="text-2xl">Registration Successful!</DialogTitle>
						<DialogDescription className="text-lg mt-2">
							Thank you for registering with Kattunar Kuzhu. Our administrators will review your application and contact you shortly.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			
			{/* Logo */}
			<div className="fixed top-0 left-0 right-0 flex justify-center items-center py-6 bg-background border-b z-10 mt-5">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
						<BiLogoKickstarter className="w-6 h-6 text-primary" />
					</div>
					<span className="text-xl font-semibold">Kattunar Kuzhu</span>
				</div>
			</div>

			{/* Progress Bar */}
			<div className="fixed top-20 left-0 right-0 bg-background z-10">
				<div className="max-w-md mx-auto px-6 py-4">
					<div className="flex items-center justify-between mb-2">
						{steps.map((step) => (
							<div
								key={step.id}
								className={cn(
									"flex flex-col items-center",
									currentStep >= step.id
										? "text-primary"
										: "text-muted-foreground"
								)}
							>
								<div
									className={cn(
										"w-8 h-8 rounded-full flex items-center justify-center mb-1",
										currentStep >= step.id
											? "bg-primary text-white"
											: "bg-muted text-muted-foreground"
									)}
								>
									{step.id}
								</div>
								<span className="text-xs">{step.name}</span>
							</div>
						))}
					</div>
					<div className="relative h-2 bg-muted rounded-full overflow-hidden">
						<div
							className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-300"
							style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
						/>
					</div>
				</div>
			</div>

			{/* Form Content */}
			<div className="max-w-md mx-auto pt-48">
				<Card className="p-6">
					{currentStep === 1 && (
						<div className="space-y-6">
							<div>
								<h2 className="text-2xl font-semibold tracking-tight">
									Select Your Group
								</h2>
								<p className="text-sm text-muted-foreground mt-2">
									Choose a group you want to be a part of
								</p>
							</div>

							<div className="space-y-3">
								{groups.map((group) => (
									<Button
										key={group.id}
										variant={
											formData.group === group.id.toString()
												? "default"
												: "outline"
										}
										className="w-full h-auto p-4 flex items-center justify-between"
										onClick={() =>
											updateFormData("group", group.id.toString())
										}
									>
										<span className="font-medium">{group.name}</span>
										{formData.group === group.id.toString() && (
											<div className="w-4 h-4 rounded-full bg-white" />
										)}
									</Button>
								))}
							</div>
						</div>
					)}

					{currentStep === 2 && (
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold tracking-tight">
								Personal Information
							</h2>

							<div className="space-y-2">
								<Label htmlFor="fullName">Full Name</Label>
								<Input
									id="fullName"
									placeholder="Enter your full name"
									value={formData.fullName}
									onChange={(e) =>
										updateFormData("fullName", e.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label>Profile Photo</Label>
								<div className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors">
									{formData.photoPreview ? (
										<div className="relative w-32 h-32">
											<Image
												src={formData.photoPreview}
												alt="Profile preview"
												fill
												className="rounded-full object-cover"
											/>
											<Button
												size="sm"
												variant="secondary"
												className="absolute bottom-0 right-0"
												onClick={() => updateFormData("photo", null)}
											>
												Change
											</Button>
										</div>
									) : (
										<div className="text-center">
											<IoCloudUpload className="mx-auto h-12 w-12 text-muted-foreground" />
											<div className="mt-2">
												<Button asChild variant="secondary">
													<label>
														Upload Photo
														<input
															type="file"
															className="sr-only"
															accept="image/*"
															onChange={handleFileUpload}
														/>
													</label>
												</Button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="mobile">Mobile Number</Label>
								<Input
									id="mobile"
									type="tel"
									placeholder="Enter mobile number"
									value={formData.mobile}
									onChange={(e) =>
										updateFormData("mobile", e.target.value.replace(/\D/g, ""))
									}
									maxLength={10}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email (Optional)</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter email address"
									value={formData.email}
									onChange={(e) => updateFormData("email", e.target.value)}
								/>
							</div>
						</div>
					)}

					{currentStep === 3 && (
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold tracking-tight">
								Business Information
							</h2>

							<div className="space-y-2">
								<Label htmlFor="businessName">Business Name</Label>
								<Input
									id="businessName"
									placeholder="Enter business name"
									value={formData.businessName}
									onChange={(e) =>
										updateFormData("businessName", e.target.value)
									}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="businessCategory">Business Category</Label>
								<Select
									value={formData.businessCategory}
									onValueChange={(value) =>
										updateFormData("businessCategory", value)
									}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select business category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="address">Business Address</Label>
								<Input
									id="address"
									placeholder="Enter business address"
									value={formData.address}
									onChange={(e) => updateFormData("address", e.target.value)}
								/>
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-6">
						<Button
							variant="outline"
							onClick={handleBack}
							disabled={currentStep === 1}
							className="w-[100px]"
						>
							<IoArrowBack className="mr-2 h-4 w-4" />
							Back
						</Button>
						<Button
							onClick={handleNext}
							disabled={isLoading || !isStepValid()}
							className="w-[100px]"
						>
							{isLoading ? (
								"Loading..."
							) : currentStep === 3 ? (
								"Finish"
							) : (
								"Next"
							)}
						</Button>
					</div>
				</Card>
			</div>
		</main>
	);
}
