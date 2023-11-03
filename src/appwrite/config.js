import conf from "../conf/conf"
import { Client,Databases, ID,Storage,Query } from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
   this.databases=new Databases(this.client)
   
   this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
          return  await this.databases.createDocument(
            conf.appwriteDatabseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
          )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
        }
    }
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error;
        }
    }
    async uploadFile(file){
try {
    return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
    )
} catch (error) {
    throw error ;
    return false;
}
    } 
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error ;
    return false;
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service =new Service()

export default service