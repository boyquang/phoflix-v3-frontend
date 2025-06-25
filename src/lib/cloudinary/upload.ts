const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_NAME!;
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!;

export const uploadFileToCloundinary = async (file: File, type: "video" | "image") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);
  formData.append("cloud_name", CLOUDINARY_NAME);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/${type}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error?.message);
  }

  return data.secure_url;
};
