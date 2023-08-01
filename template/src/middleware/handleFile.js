import multer from "multer";

const handleFile = (req, res, next) => {
	const upload = multer({
		dest: "./public/data/uploads/",
		fileFilter: (req, file, cb) => {
			console.log(file);
			const validFiles = ["image/jpeg", "image/png", "application/pdf"];
			if (validFiles.includes(file.mimetype)) {
				return cb(null, true);
			}

			return cb(new Error("File should be jpg, png or pdf"));
		},
		limits: { fileSize: 6 * 1000 * 1000 },
	}).single("uploaded_file");

	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			console.log(err.message);
		} else if (err) {
			// An unknown error occurred when uploading.
			return res.status(200).json({ message: "Please make sure file is of jpeg, png or pdf format" });
		}

		// Everything went fine.
		next();
	});
};

export default handleFile