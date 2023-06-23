import './App.css'
import axios from "axios";
import React from "react";

function App() {

    const [file, setFile] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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

                        setImgPreview(URL.createObjectURL(e.target.files[0]))

                    }}
                    accept={"image/png"}
                />
                <button>Submit</button>
            </form>
        </>
    );
}

export default App;
