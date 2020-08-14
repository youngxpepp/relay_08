/**
 * Response Message
 */
// export class ResponseMessage {
//     private data: any | any[]; // response data

//     private code: number; // response code

//     public success(): ResponseMessage {
//         this.code = 1;
//         return this;
//     }

//     public error(code: number, message: string = "Error"): ResponseMessage {
//         this.code = code;
//         this.data = { message };
//         return this;
//     }

//     public body(data: any | any[] = ""): ResponseMessage {
//         this.data = data;
//         return this;
//     }

//     get Data(): any | any[] {
//         return this.data;
//     }

//     get Code(): number {
//         return this.code;
//     }

//     public build(): Response {
//         return new Response(this);
//     }
// }

// export class Response {
//     data: any | any[];

//     code: number;

//     constructor(message: ResponseMessage) {
//         this.data = message.Data;
//         this.code = message.Code;
//     }
// }
