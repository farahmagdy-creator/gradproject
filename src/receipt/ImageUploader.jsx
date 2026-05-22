import { UploadCloud, X } from "lucide-react";
import { useState, useEffect } from "react";

function ImageUploader({ setValue }) {
  const [images, setImages] = useState([]);

  // Handle file selection and create previews
  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updated = [...images, ...newImages];
    setImages(updated);

    // Sync images with form state
    setValue("images", updated.map((img) => img.file));
  };

  // Remove selected image
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);

    setValue("images", updated.map((img) => img.file));
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <div className="mt-4">

      <label className="form-label fw-semibold">
        صور الحالة الحالية للجهاز
      </label>

      {/* Upload area */}
      <div
        className="border rounded p-4 text-center"
        style={{
          borderStyle: "dashed",
          background: "#fafafa",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <UploadCloud size={32} className="mb-2" />
        <div>اسحب الصور هنا أو اضغط للاختيار</div>
        <small className="text-muted">PNG, JPG حتى 10MB</small>

        <input
          id="fileInput"
          type="file"
          multiple
          hidden
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Image previews */}
      <div className="d-flex flex-wrap gap-3 mt-3">
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
            }}
          >
            <img
              src={img.preview}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeImage(index)}
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "#ef4444",
                border: "none",
                borderRadius: "50%",
                width: "22px",
                height: "22px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ImageUploader;