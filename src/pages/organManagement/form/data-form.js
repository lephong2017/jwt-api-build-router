export const listField=[
    {
        id:"NameOrganization",
        label:"Organization name:",
        description:"Tên của tổ chức bạn!",
        icon:"user",
        placeholder:"Enter your organization name...",
        required:true,
        message:'Vui lòng nhập organization name',
        defaultValue:"Proptech Plus",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
    {
        id:"displayNameDB",
        label:"Database name:",
        description:"Bạn cần đặt tên database cho tổ chức bạn.",
        icon:"lock",
        placeholder:"Enter your database name...",
        required:true,
        message:'Vui lòng nhập database name',
        defaultValue:"proptechplusDB",
        event:{
            onClick:()=>console.log("event onClick "),
            onChange:()=>console.log("event onChange "),
        },
        fieldType:{
            type:"INPUT_TEXT",
        }
    },
  ]
export  const styles={
    textAlign:'center'
  }