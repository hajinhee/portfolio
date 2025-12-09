import { FormState } from "@/types";
import { useActionState, useEffect, useState } from "react";

interface MessageModalProps {
  onClose: () => void;
}

export function MessageModal({ onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (previousState, formData) => {
      // 폼 데이터 객체에 접근
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;

      if (!name || !email || !subject || !message) {
        return { status: "error", message: "모든 필수 항목을 입력해주세요." };
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          status: "success",
          message: "메시지가 성공적으로 전송되었습니다!",
        };
      } catch (error) {
        console.log("error");
        return { status: "error", message: "메시지 전송에 실패했습니다." };
      }
    },
    { status: "", message: "" }
  );

  // 모달 닫기 핸들러
  const handleClose = () => {
    if (isClosing || isPending) return;

    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // ESC 키로 닫기 (전송 중이 아닐 때만)
  useEffect(() => {
    const handleEscape = (e: { key: string }) => {
      if (e.key === "Escape" && !isPending) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isPending]); // isLoading 상태가 변경될 때마다 리스너 갱신

  // 폼 입력값 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 성공 시 모달 닫기
  useEffect(() => {
    if (state.status === "success") {
      setShowSuccessPopup(true);
      setTimeout(() => handleClose(), 2000);
    }
  }, [state.status, handleClose]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleClose}
          aria-label="Close modal"
        ></div>

        <div
          className={`relative bg-white dark:bg-[#1e1e1e] border-2 border-[#007acc] dark:border-[#39FF14] rounded-lg max-w-4xl w-full max-h-[90vh] transition-all duration-300 ${
            isClosing ? "animate-modal-out" : "animate-modal-in"
          }`}
        >
          <header className="flex items-center justify-between p-4 border-b border-[#007acc]/20 dark:border-[#39FF14]/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-[#007acc] dark:text-[#39FF14]">
                contact/send-message
              </span>
            </div>
            <button
              onClick={handleClose}
              disabled={isPending}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#007acc]/10 dark:hover:bg-[#39FF14]/10 rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close modal"
            >
              <i className="ri-close-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </header>

          <section className="p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#007acc] dark:text-[#39FF14]">
              Message
            </h2>

            <form action={formAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name *"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#39FF14]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] dark:focus:ring-[#39FF14] transition-colors text-black dark:text-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com *"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#39FF14]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] dark:focus:ring-[#39FF14] transition-colors text-black dark:text-white"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className=" mb-3 w-full px-4 py-3  dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#39FF14]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] dark:focus:ring-[#39FF14] transition-colors text-black dark:text-white "
              />

              <textarea
                name="message"
                placeholder="Your message *"
                required
                value={formData.message}
                onChange={handleInputChange}
                className=" mb-3 w-full px-4 py-3  dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#39FF14]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] dark:focus:ring-[#39FF14] transition-colors text-black dark:text-white"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center px-6 py-3 bg-[#007acc] dark:bg-[#39FF14] text-white dark:text-[#1e1e1e] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  {isPending ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      {/* 성공 팝업 */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-500">
          <div className="p-6 text-center">
            <p className="text-2xl font-bold mb-4 text-[#007acc] dark:text-[#39FF14]">
              ✔️ Message sent
            </p>
          </div>
        </div>
      )}
    </>
  );
}
