export const ROLES_BREADCRUMB_HEADER = {
  EN: "Roles Management",
  AR: "إدارة الصلاحيات",
};

export const ROLES_ACTIONS_CONTENT = [
  {
    title: { EN: "Create Roles With Bulk", AR: "إنشاء الأدوار بكميات كبيرة" },
  },
  {
    title: { EN: "Delete All Roles", AR: "حذف جميع الأدوار" },
  },
];

export const NEW_ROLE_BUTTON = {
  EN: "New Role",
  AR: "إضافة دور جديد",
};

export const NEW_ROLE_DIALOG_CONTENT = {
  title: { EN: "Create New Role", AR: "إنشاء دور جديد" },
  description: {
    EN: "Please fill the form to create a new role",
    AR: "من فضلك أدخل البيانات المطلوبة لإنشاء دور جديد",
  },
  formFields: {
    name: { EN: "Role Name", AR: "إسم الدور" },
    description: { EN: "Role Description", AR: "وصف الدور" },
  },
  formFieldsPlaceholders: {
    name: { EN: "Enter Role Name", AR: "أدخل إسم الدور" },
    description: { EN: "Enter Role Description", AR: "أدخل وصف الدور" },
  },
  submitButton: { EN: "Create new role", AR: "إنشاء دور جديد" },
  cancelButton: { EN: "Cancel", AR: "إلغاء" },
};

export const NEW_ROLE_SERVER_RESPONSE_DATA = {
  success: {
    title: { EN: "Success", AR: "نجاح" },
    description: {
      EN: "Role created successfully",
      AR: "تم إنشاء الدور بنجاح",
    },
  },
  errors: {
    existingRole: {
      title: { EN: "Error", AR: "خطأ" },
      description: { EN: "Role already exists", AR: "الدور موجود بالفعل" },
    },
    unknown: {
      title: { EN: "Error", AR: "خطأ" },
      description: {
        EN: "Unknown error in adding new role",
        AR: "خطأ غير معروف في إضافة دور جديد",
      },
    },
  },
};

export const ROLE_CARD_DATA = {
  actions: {
    profile: { EN: "Show Role Profile", AR: "عرض الدور" },
    assignUsers: { EN: "Assign Users", AR: "تعيين المستخدمين" },
    edit: { EN: "Edit Role", AR: "تعديل الدور" },
    delete: { EN: "Delete Role", AR: "حذف الدور" },
  },
};

export const ROLE_PROFILE_DIALOG_DATA = {
  assignedUsers: { EN: "Assigned Users", AR: "المستخدمين المعينين" },
  noUsers: { EN: "No users assigned", AR: "لا يوجد مستخدمين معينين" },
  close: { EN: "Close", AR: "إغلاق" },
};

export const ROLE_EDIT_DIALOG_DATA = {
  title: { EN: "Edit Role", AR: "تعديل الدور" },
  formFields: {
    name: { EN: "Role Name", AR: "إسم الدور" },
    description: { EN: "Role Description", AR: "وصف الدور" },
  },
  formFieldsPlaceholders: {
    name: { EN: "Enter Role Name", AR: "أدخل إسم الدور" },
    description: { EN: "Enter Role Description", AR: "أدخل وصف الدور" },
  },
  submitButton: { EN: "Update the role", AR: "تحديث الدور" },
  cancelButton: { EN: "Cancel", AR: "إلغاء" },
  responses: {
    success: {
      title: { EN: "Success", AR: "نجاح" },
      description: {
        EN: "Role updates successfully",
        AR: "تم تحديث الدور بنجاح",
      },
    },
    errors: {
      notExistingRole: {
        title: { EN: "Error", AR: "خطأ" },
        description: { EN: "Role does not exist", AR: "الدور غير موجود" },
      },
      unknown: {
        title: { EN: "Error", AR: "خطأ" },
        description: {
          EN: "Unknown error in updating new role",
          AR: "خطأ غير معروف في تحديث الدور",
        },
      },
    },
  },
};

export const ASSIGN_USERS_ROLE_DIALOG = {
  title: { EN: "Assign Users", AR: "تعيين مستخدمين" },
  noUsers: { EN: "No users found", AR: "لا يوجد مستخدمين" },
  buttons: {
    save: { EN: "Save", AR: "حفظ" },
    cancel: { EN: "Cancel", AR: "إلغاء" },
  },
};

export const DELETE_ROLE_DIALOG = {
  title: { EN: "Delete Role", AR: "حذف الدور" },
};
