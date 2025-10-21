import { useState } from 'react';
import { FolderOpen, MoreVertical, Download, Edit2, ArrowRight, Trash2, Plus, Image } from 'lucide-react';

interface Folder {
  id: string;
  name: string;
}

interface FileItem {
  id: string;
  name: string;
  folderId: string;
}

const FilesPage = () => {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Photos' },
    { id: '2', name: 'ID Proofs' },
    { id: '3', name: 'Invoices' }
  ]);
  
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'Image 1', folderId: '1' },
    { id: '2', name: 'Image 2', folderId: '1' },
    { id: '3', name: 'Image 3', folderId: '1' }
  ]);
  
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showMoveToModal, setShowMoveToModal] = useState(false);
  const [itemToMove, setItemToMove] = useState<string | null>(null);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: newFolderName.trim()
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowNewFolderModal(false);
    }
  };

  const handleRenameFolder = (folderId: string) => {
    if (editingName.trim()) {
      setFolders(folders.map(f => 
        f.id === folderId ? { ...f, name: editingName.trim() } : f
      ));
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleRenameFile = (fileId: string) => {
    if (editingName.trim()) {
      setFiles(files.map(f => 
        f.id === fileId ? { ...f, name: editingName.trim() } : f
      ));
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleRemoveFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
    setFiles(files.filter(f => f.folderId !== folderId));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const handleDownload = (name: string) => {
    alert(`Downloading ${name}...`);
  };

  const handleAddFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const selectedFiles = target.files;
      if (selectedFiles && selectedFolder) {
        Array.from(selectedFiles).forEach((file) => {
          const newFile: FileItem = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            folderId: selectedFolder
          };
          setFiles(prev => [...prev, newFile]);
        });
      }
    };
    input.click();
  };

  const handleMoveTo = (fileId: string) => {
    setItemToMove(fileId);
    setShowMoveToModal(true);
    setOpenMenuId(null);
  };

  const handleMoveFile = (targetFolderId: string) => {
    if (itemToMove) {
      setFiles(files.map(f => 
        f.id === itemToMove ? { ...f, folderId: targetFolderId } : f
      ));
      setShowMoveToModal(false);
      setItemToMove(null);
    }
  };

  const currentFiles = selectedFolder 
    ? files.filter(f => f.folderId === selectedFolder)
    : [];

  const currentFolderName = folders.find(f => f.id === selectedFolder)?.name || '';

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ background: 'linear-gradient(to bottom, #f3faef, #e9ecef)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Folders View */}
        {!selectedFolder && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Folders</h1>
              <button
                onClick={() => setShowNewFolderModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
              >
                <Plus size={18} />
                New Folder
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedFolder(folder.id)}
                      className="flex items-center gap-3 flex-1 text-left min-w-0"
                    >
                      <FolderOpen className="text-gray-600 flex-shrink-0" size={24} />
                      <span className="text-base sm:text-lg font-semibold text-gray-900 truncate">{folder.name}</span>
                    </button>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === folder.id ? null : folder.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    >
                      <MoreVertical size={20} className="text-gray-600" />
                    </button>
                  </div>

                  {openMenuId === folder.id && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setOpenMenuId(null)}
                      />
                      <div className="absolute right-4 sm:right-6 top-14 sm:top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[160px]">
                        <button
                          onClick={() => {
                            handleDownload(folder.name);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Download size={18} className="text-gray-700" />
                          <span className="text-gray-900">Download</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(folder.id);
                            setEditingName(folder.name);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Edit2 size={18} className="text-gray-700" />
                          <span className="text-gray-900">Rename</span>
                        </button>
                        <button
                          onClick={() => {
                            handleRemoveFolder(folder.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <Trash2 size={18} className="text-gray-700" />
                          <span className="text-gray-900">Remove</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Files View */}
        {selectedFolder && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                >
                  <ArrowRight size={24} className="text-gray-700 rotate-180" />
                </button>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{currentFolderName}</h1>
              </div>
              <button
                onClick={handleAddFile}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
              >
                <Plus size={18} />
                Add New
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-t-lg">
                    <Image size={48} className="text-gray-400" />
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-gray-200">
                    <span className="font-semibold text-gray-900 truncate flex-1 mr-2">{file.name}</span>
                    <div className="relative flex-shrink-0">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={20} className="text-gray-600" />
                      </button>
                      
                      {openMenuId === file.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[160px]">
                            <button
                              onClick={() => {
                                handleDownload(file.name);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Download size={18} className="text-gray-700" />
                              <span className="text-gray-900">Download</span>
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(file.id);
                                setEditingName(file.name);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Edit2 size={18} className="text-gray-700" />
                              <span className="text-gray-900">Rename</span>
                            </button>
                            <button
                              onClick={() => handleMoveTo(file.id)}
                              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <ArrowRight size={18} className="text-gray-700" />
                              <span className="text-gray-900">Move To</span>
                            </button>
                            <button
                              onClick={() => {
                                handleRemoveFile(file.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Trash2 size={18} className="text-gray-700" />
                              <span className="text-gray-900">Remove</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* New Folder Modal */}
        {showNewFolderModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">New Folder</h2>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Untitled Folder"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                autoFocus
              />
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setShowNewFolderModal(false);
                    setNewFolderName('');
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rename Modal */}
        {editingId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Rename</h2>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const isFolder = folders.some(f => f.id === editingId);
                    isFolder ? handleRenameFolder(editingId) : handleRenameFile(editingId);
                  }
                }}
                autoFocus
              />
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditingName('');
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const isFolder = folders.some(f => f.id === editingId);
                    isFolder ? handleRenameFolder(editingId) : handleRenameFile(editingId);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Move To Modal */}
        {showMoveToModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Move To Folder</h2>
              <div className="space-y-2 mb-6">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleMoveFile(folder.id)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-200"
                  >
                    <FolderOpen size={20} className="text-gray-600 flex-shrink-0" />
                    <span className="text-gray-900 truncate">{folder.name}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowMoveToModal(false);
                    setItemToMove(null);
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;