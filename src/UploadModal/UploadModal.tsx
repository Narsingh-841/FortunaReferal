import React, { useEffect, useState } from "react";
import { Upload, X, Download, Trash2, File } from "lucide-react";

interface UploadItem {
  id: string;
  name: string;
  date: string;
  uploadedBy: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items?: UploadItem[];
  onUpload?: (file: File) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  title = "Uploads",
  items = [],
  onUpload,
  onDownload,
  onDelete,
}) => {
  const [uploadItems, setUploadItems] = useState<UploadItem[]>(items);

  // 🧠 Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
      const newItem: UploadItem = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        uploadedBy: "Current User",
      };
      setUploadItems([...uploadItems, newItem]);
    }
  };

  const handleDownload = (id: string) => onDownload?.(id);
  const handleDelete = (id: string) => {
    onDelete?.(id);
    setUploadItems(uploadItems.filter((item) => item.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-end transition-all duration-300 ${
        isOpen ? "visible bg-black/50" : "invisible bg-transparent"
      }`}
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`transform transition-all duration-300 ease-out bg-white rounded-lg shadow-xl w-full max-w-md mx-4 mb-6 flex flex-col border border-gray-200 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Upload File
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable File List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[400px]">
          {uploadItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <File className="w-16 h-16 mb-3" />
              <p className="text-sm">No files uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {uploadItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.date} by {item.uploadedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleDownload(item.id)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
