const AWS = require("aws-sdk");
const Bucket = "test-bucket";

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-southeast-1",
    signatureVersion: "v4"
});
const s3 = new AWS.S3();

const getLimitedUploadSignedUrl = (key, content = "image", expire = 300) => {
    const result = s3.createPresignedPost({
        Bucket,
        Fields: {
            Key: key
        },
        Expires: expire,
        ACL: "private",
        Conditions: [
            ["starts-with", "$Content-Type", content + "/"],
            ["content-length-range", 0, 2000000]
        ]
    });
    return result;
};

const getUploadSignedUrl = (key, expire = 300) => {
    const url = s3.getSignedUrl("putObject", {
        Bucket,
        Key: key,
        Expires: expire,
        ACL: "private"
    });
    return url;
};

console.log(getLimitedUploadSignedUrl("folder/test.png"));
console.log(getUploadSignedUrl("test/admin/activity/test.png"));

