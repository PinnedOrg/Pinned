const FormData = require("form-data");
const axios = require("axios");

const encodedImageKitApiKey = () => {
    return Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64'); // colon after private key is required for imagekit
}


const uploadToImageKit = async (fileBuffer, fileName, path, tagsArray) => {
    const folder = `${process.env.ENVIRONMENT === 'Production' ? 'Prod' : 'Dev'}/${path}`;
    const tags = tagsArray.join(','); // add additional tags separated by commas no space

    // Create form data
    const formData = new FormData();
    formData.append('file', fileBuffer, fileName);
    formData.append('fileName', fileName);
    formData.append('folder', folder);
    formData.append('tags', tags);

    try {
        const res = await axios.post('https://upload.imagekit.io/api/v2/files/upload', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Basic ${encodedImageKitApiKey()}`,
            },
        });

        return {
            status: res.status,
            data: res.data
        }
    } catch (err) {
        console.log(`Unable to upload ${fileName} to Imagekit: ${err.message}`)
        return {
            status: err.response?.status,
            error: err.message
        }
    }
}

const deleteFromImageKit = async (fileId) => {
    try {
        const res = await axios.delete(`https://upload.imagekit.io/api/v1/files/${fileId ?? ""}`, {
            headers: {
                Authorization: `Basic ${encodedImageKitApiKey()}`,
            },
        });

        console.log(`${fileId} deleted from ImageKit`)
        return {
            status: res.status,
            data: res.data
        }
    } catch (err) {
        console.log(`Unable to delete ${fileId} from ImageKit: ${err.message}`);
        return {
            stats: err.response?.status,
            error: err.message
        }
    }
}

module.exports = {
    uploadToImageKit,
    deleteFromImageKit,
}