import './App.css'
import axios from "axios";
import React from "react";

function App() {
    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // image preview not quite working right now
    // still wip

    return (
        <>
            {imgPreview && (
                <img
                    src={imgPreview}
                    alt={"preview"}
                />
            )}

            <form onSubmit={async (e) => {
                // FILE UPLOAD
                e.preventDefault();

                if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    const res = await axios.post("/api/files", formData);

                    alert(JSON.stringify(res.data, null, 2));
                }
            }}>
                <button type={"button"} onClick={() => {
                    fileInputRef.current?.click();
                }}> UPLOAD IMAGE</button>

                <input
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    type={"file"}
                    onChange={(e) => {
                        // FILE CHANGE
                        if (!e.target.files || e.target.files.length < 1) {
                            setFile(null);
                            setImgPreview(null);
                            return;
                        }

                        setFile(e.target.files[0]);

                        // PREVIEW

                        const reader = new FileReader();

                        reader.addEventListener("load", () => {
                            // convert image file to base64 string
                            setImgPreview(reader.result as string);
                        }, false);

                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }}
                    accept={"image/png"}
                />

                <button>Submit</button>
            </form>
        </>
    );
}

export default App;
