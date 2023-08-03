"use client";

import useRentModal from "@/app/hooks/useRentModal";
import { useState, useMemo } from "react";
import Heading from "../Heading";
import Modal from "./Modal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

/* 상수들의 집합을 정의하는 것을 도와주는 기능입니다. 
enum은 열거형(enumeration)이라고도 불리며, 
상수에 이름을 부여하여 코드를 읽기 쉽고 유지보수하기 편하게 함 */
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      ImageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  /* 리액트 Form 훅의 watch 메소드는 해당 입력값을 가져옴 */
  const category = watch("category");
  const location = watch("location");

  /* 이상하게 임포트하기 */
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  /* Form 상태를 업데이트할 때 사용,
  id는 변경하고자하는 요소의 이름
  setValue 메소드는 Form 상태 업데이트 메소드
  유효성 검사(validation), 변동 여부 체크(dirty), 터치 여부 체크(touch) */
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  /* category는 watch를 통해 category 입력 요소의 값을 가져옵니다. 
  그리고 setCustomValue 함수를 호출하면 category 입력 요소의 값을 
  "clickedCategory"로 변경합니다. 
  이렇게 함으로써 사용자가 버튼을 클릭하여 
  입력 요소의 값을 변경할 수 있습니다. */

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(clickedCategory) =>
                setCustomValue("category", clickedCategory)
              }
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(clickedValue) => setCustomValue("location", clickedValue)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
      title="Airbnb your home!"
    />
  );
};

export default RentModal;
