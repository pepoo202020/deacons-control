'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoaderC from '@/ui/components/shared/loader-c';
import Alert from '@/ui/components/shared/alert';

interface NewRoleFormProps {
  createRoleAction: (formData: FormData) => Promise<{ success: boolean; message: string; title: string }>;
}

const formHeader = {
  EN: "Add New Role",
  AR: "إضافة صلاحية جديدة",
}

const formFields = {
  name: {
    label: { EN: "Role Name", AR: "اسم الصلاحية" },
    placeholder: { EN: "Enter Role Name", AR: "أدخل اسم الصلاحية" },
  },
  description: {
    label: { EN: "Role Description", AR: "وصف الصلاحية" },
    placeholder: { EN: "Enter Role Description", AR: "أدخل وصف الصلاحية" },
  },
  cancel: { EN: "Cancel", AR: "إلغاء" },
  submit: { EN: "Submit", AR: "إرسال" },
}


export default function NewRoleForm({ createRoleAction }: NewRoleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertData, setAlertData] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
    title: string;
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isSubmitting) return;
    setAlertData(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    try {

      const result = await createRoleAction(formData);
      setAlertData({
        show: true,
        message: result.message,
        type: result.success ? "success" : "error",
        title: result.title,
        position: "top-center"
      });
      form.reset();

      router.push('/dashboard/roles');
      router.refresh();
    } catch (error) {
      console.error('Error creating role:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {alertData && (
        <Alert
          message={alertData.message}
          type={alertData.type}
          show={alertData.show}
          position="top-center"
          title={alertData.title}
        />
      )}
      <div className="bg-white dark:bg-blue-950 rounded-lg p-6 shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {formHeader.AR}
        </h2>

        {/* Role Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {formFields.name.label.AR}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder={formFields.name.placeholder.AR}
          />
        </div>

        {/* Role Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {formFields.description.label.AR}
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder={formFields.description.placeholder.AR}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {formFields.cancel.AR}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md 
              ${isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'} 
              transition-colors duration-200`}
          >
            {isSubmitting ? <LoaderC inButton={true} size="small" /> : formFields.submit.EN}
          </button>
        </div>
      </div>
    </form>
  );
}