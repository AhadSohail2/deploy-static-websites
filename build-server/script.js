const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const S3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

async function init() {
  console.log("Executing script.js");

  const outDir = path.join(__dirname, "output");

  // Run npm install and build
  const p = exec(`cd ${outDir} && npm install && npm run build`);

  p.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  p.stderr.on("data", (error) => {
    console.error(error.toString());
  });

  const Project_ID = process.env.PROJECT_ID;

  p.on("close", async function () {
    console.log("Build Complete");
    const distFolderPath = path.join(__dirname, "output", "build");
    const distFolderContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    });

    for (const file of distFolderContents) {
      const filePath = path.join(distFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log("uploading", filePath);

      const command = new PutObjectCommand({
        Bucket: "vercel-clone-ahad",
        Key: `__outputs/${Project_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath),
      });

      await S3.send(command);
      console.log("uploaded", filePath);
    }
    console.log("Done...");
  });

  p.exitCode(0);
}

init();
