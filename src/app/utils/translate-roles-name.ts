export const translateRolesName = (name: string, lang: string) => {
  if(lang === "AR") {
    switch (name) {
      case "admin":
        return "مدير";
      case "controller":
        return "متحكم";
        case "teacher" :
          return "مدرس";
          default:
            return "مستخدم";
    }
  } else {
    switch (name) {
      case "مدير":
        return "admin";
      case "متحكم":
        return "controller";
        case "مدرس":
          return "teacher";
          default:
            return "user";
    }
  }
}
