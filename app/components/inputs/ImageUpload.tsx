"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

/* cloudinary 전역변수 선언 */
declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  /* 업로드 결과 이미지 url을 onChange에 담고 부모 컴포넌트에서 상태 업데이트 */
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="hibti0g3"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

/* ({ open }) CldUploadWidget 컴포넌트는 chidren으로 랜더링 함수 받음
렌더링 함수를 제공할 때, 
해당 함수의 인자로 전달되는 객체에는 open이라는 속성이 있습니다. 
이 open은 업로드 위젯을 실행하여 파일 선택 대화 상자를 열 때 
사용되는 함수입니다.

그러나 open이라는 속성을 바로 사용하는 대신, 
({ open })과 같이 비구조화 할당 문법을 사용하여 
open을 바로 변수로 사용하고 있습니다. 이렇게 
함으로써 open을 함수 안에서 직접 사용할 수 있습니다. 
예를 들면, open()과 같이 함수를 호출할 수 있습니다. */
