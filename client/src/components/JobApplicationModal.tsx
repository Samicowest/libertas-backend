import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, FileText, Mail, CheckCircle, Upload, AlertCircle } from "lucide-react";

interface JobApplicationModalProps {
  jobTitle: string;
  jobId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function JobApplicationModal({
  jobTitle,
  jobId,
  onClose,
  onSuccess,
}: JobApplicationModalProps) {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Job-specific CV requirements
  const cvRequirements: Record<string, string[]> = {
    "1": [
      "Smart contract development experience",
      "Solidity or Rust proficiency",
      "DeFi project portfolio",
      "GitHub profile link",
    ],
    "2": [
      "Community engagement experience",
      "Social media management skills",
      "Community building portfolio",
      "Crisis management examples",
    ],
    "3": [
      "Product management certifications",
      "Experience with Agile/Scrum",
      "Portfolio of completed projects",
      "Team leadership examples",
    ],
    "4": [
      "Writing samples (3-5 articles)",
      "Medium or blog portfolio",
      "Research and technical writing skills",
      "Content strategy experience",
    ],
  };

  const requirements = cvRequirements[jobId] || [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF or Word document");
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return;
    }

    setCvFile(file);
    setError("");
  };

  const handleSubmitApplication = async () => {
    if (!fullName.trim() || !email.trim() || !cvFile) {
      setError("Please fill in all fields and upload your CV");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", cvFile);
      formData.append("jobId", jobId);
      formData.append("jobTitle", jobTitle);
      formData.append("fullName", fullName);
      formData.append("email", email);

      // In a real implementation, this would call your backend API
      // For now, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show confirmation
      setStep("confirmation");
      onSuccess?.();
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (step === "confirmation") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for applying to the <strong>{jobTitle}</strong> position.
          </p>
          
          {/* Certify Program Prompt */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-purple-900 mb-3">
              <strong>💡 Did you know?</strong> Candidates who have completed Libertas Alpha training programs have significantly higher chances of being selected!
            </p>
            <p className="text-xs text-purple-800 mb-4">
              Our Certify program offers training in Trading Analysis, Project Management, Smart Contract Development, and Affiliate Servicing. Completing these tracks not only enhances your skills but also demonstrates commitment to the Libertas Alpha ecosystem.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                onClose();
                // Navigate to Certify page
                window.location.href = "/certify";
              }}
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
            >
              Explore Certify Program
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            We will review your application and contact you within 5-7 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Apply for {jobTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              What to Include in Your CV
            </h3>
            <ul className="space-y-2">
              {requirements.map((req, idx) => (
                <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your CV *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition">
                <input
                  type="file"
                  id="cv-upload"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  disabled={isUploading}
                />
                <label
                  htmlFor="cv-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  {cvFile ? (
                    <div className="text-center">
                      <p className="font-medium text-gray-700">{cvFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(cvFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-medium text-gray-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF or Word document (Max 5MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900 flex items-start gap-2">
              <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Secure Upload:</strong> Your CV is uploaded securely to our system. We will review it and contact you within 5-7 business days.
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitApplication}
            disabled={!fullName.trim() || !email.trim() || !cvFile || isUploading}
            className="flex-1 bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

