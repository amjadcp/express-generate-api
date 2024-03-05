/* eslint-disable @typescript-eslint/naming-convention */
import { errorWrapper } from "../middleware/errorWrapper.middleware";
// import aws from "aws-sdk";
import { Request, Response } from "express";
import { httpCodeUtils, responseUtils } from "../utils/response.utils";

// const region = appConfig.awsBucketRegion;
// const accessKeyId = appConfig.awsAccessKey;
// const secretAccessKey = appConfig.awsSecretKey;

// const s3 = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: "v4",
// });

const getS3Urls = errorWrapper(
  async (req: Request, res: Response) => {
    const { file_names } = req.body; // array of file names with extension

    const urls: string[] = [file_names]; // array of objects {file_name, url, file_type}
    // const bucket = appConfig.awsBucketName;

    // for (let i = 0; i < file_names.length; i++) {
    //   const params = {
    //     Bucket: bucket,
    //     Key: file_names[i],
    //     Expires: 60,
    //   };
    //   const url = await s3.getSignedUrlPromise("putObject", params);
    //   let file_type = file_names[i].split(".");
    //   file_type = file_type[file_type.length - 1];
    //   urls.push({ file_name: file_names[i], file_type, url });
    // }

    return responseUtils(res, {
      status: httpCodeUtils.OK,
      success: true,
      message: "Successfully generated urls",
      data: urls,
    });
  },
);

export { getS3Urls };
