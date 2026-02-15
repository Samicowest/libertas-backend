import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2, Copy } from "lucide-react";

interface NFTMintingModalProps {
  isOpen: boolean;
  trackName: string;
  evaluationScore?: number;
  onClose: () => void;
  onMint: () => Promise<void>;
}

export default function NFTMintingModal({
  isOpen,
  trackName,
  evaluationScore = 0,
  onClose,
  onMint,
}: NFTMintingModalProps) {
  const [status, setStatus] = useState<"ready" | "minting" | "success" | "error">("ready");
  const [nftTokenId, setNftTokenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleMint = async () => {
    try {
      setStatus("minting");
      setErrorMessage(null);
      await onMint();
      
      // Simulate NFT minting with a token ID
      const tokenId = `SBNFT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setNftTokenId(tokenId);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to mint NFT");
    }
  };

  const copyToClipboard = () => {
    if (nftTokenId) {
      navigator.clipboard.writeText(nftTokenId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8" style={{ backgroundColor: '#0E0741' }}>
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2">Congratulations! 🎉</h2>
        <p className="text-gray-300 mb-6">You've successfully completed the {trackName} track with an evaluation score of {evaluationScore}%!</p>

        {/* Status Content */}
        {status === "ready" && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(130, 54, 253, 0.1)', borderColor: '#8236FD', borderWidth: '1px' }}>
              <p className="text-white text-sm">
                Your Soul Bound NFT Certificate is ready to be minted. This certificate is non-transferable and represents your achievement in the {trackName} track with a {evaluationScore}% evaluation score.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                <strong>Certificate Details:</strong>
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Track: <span className="text-white">{trackName}</span></p>
                <p>Evaluation Score: <span className="text-accent">{evaluationScore}%</span></p>
                <p>Type: <span className="text-white">Soul Bound NFT (Non-transferable)</span></p>
                <p>Date: <span className="text-white">{new Date().toLocaleDateString()}</span></p>
              </div>
            </div>
          </div>
        )}

        {status === "minting" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Loader2 size={48} className="text-accent animate-spin" />
            <p className="text-white text-center">Minting your NFT certificate...</p>
            <p className="text-gray-400 text-sm text-center">This may take a few moments</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle size={64} className="text-green-400" />
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22c55e', borderWidth: '1px' }}>
              <p className="text-green-400 text-center font-semibold">NFT Minted Successfully!</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Token ID:</p>
              <div className="flex items-center gap-2 bg-gray-800 p-3 rounded">
                <code className="text-accent text-sm flex-1 break-all">{nftTokenId}</code>
                <button
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Copy token ID"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-gray-300 text-sm">
                Your Soul Bound NFT certificate has been minted and is now stored in your wallet. You can view it in your collection anytime.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <AlertCircle size={64} className="text-red-400" />
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444', borderWidth: '1px' }}>
              <p className="text-red-400 text-center font-semibold">Minting Failed</p>
            </div>
            {errorMessage && (
              <div className="p-3 rounded bg-gray-800 text-gray-300 text-sm">
                {errorMessage}
              </div>
            )}
            <p className="text-gray-300 text-sm">
              Please try again or contact support if the issue persists.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          {status === "ready" && (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                style={{ borderColor: '#ABABB9', color: '#FFFFFF' }}
              >
                Maybe Later
              </Button>
              <Button
                onClick={handleMint}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Mint Certificate
              </Button>
            </>
          )}
          {status === "minting" && (
            <Button disabled className="w-full bg-accent/50 text-accent-foreground">
              Minting...
            </Button>
          )}
          {(status === "success" || status === "error") && (
            <Button
              onClick={onClose}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
