import { useFunnel } from "@use-funnel/react-router-dom";
import { StepHeader } from "@/components/Steps/StepHeader";
import PageLayout from "@/layouts/PageLayout";
import ComponentLayout from "@/layouts/ComponentLayout";
import Button from "@/components/common/Button";
import { ConsentStep } from "@/components/Steps/ConsentStep";
import { PersonalInfoStep } from "@/components/Steps/PersonalInfoStep";
import { PositionStep } from "@/components/Steps/PositionStep";
import { useState } from "react";

import { FullPageLoading } from "@/components/Loading";

type ConsentStepType = {
  consent?: string;
};

type PersonalInfoStepType = {
  name?: string;
  email?: string;
  phone?: string;
};

type PositionStepType = {
  position?: string;
};

type FunnelState = {
  consent: ConsentStepType;
  personalInfo: ConsentStepType & PersonalInfoStepType;
  position: ConsentStepType & PersonalInfoStepType & PositionStepType;
};

/**
 * 지원 페이지
 */

const ApplyPage = () => {
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const funnel = useFunnel<FunnelState>({
    id: "apply-process",
    initial: {
      step: "consent",
      context: {},
    },
  });

  const getCurrentStep = () => {
    switch (funnel.step) {
      case "consent":
        return 1;
      case "personalInfo":
        return 2;
      case "position":
        return 3;
      default:
        return 1;
    }
  };

  const handleSubmit = (data: FunnelState["position"]) => {
    setLoading(true);
    console.log("제출 데이터>>>>>>>>>", data);
    setTimeout(() => {
      setLoading(false);
      window.location.replace("./apply/complete");
    }, 1000);
  };
  const handleNextClick = () => {
    switch (funnel.step) {
      case "consent":
        if (funnel.context.consent) {
          funnel.history.push("personalInfo", {
            consent: funnel.context.consent,
          });
        }
        break;
      case "personalInfo":
        if (
          funnel.context.name &&
          funnel.context.email &&
          funnel.context.phone &&
          isPersonalInfoValid
        ) {
          funnel.history.push("position", funnel.context);
        }
        break;
      case "position":
        if (funnel.context.position) {
          handleSubmit(funnel.context);
        }
        break;
    }
  };

  return (
    <PageLayout className="gap-6">
      {loading && <FullPageLoading />}
      <ComponentLayout className="">
        <div className="flex justify-center">
          <div className="text-2xl font-bold">Prography 10기 지원서</div>
        </div>
      </ComponentLayout>

      <ComponentLayout>
        <StepHeader currentStep={getCurrentStep()} totalSteps={3} />
      </ComponentLayout>

      <ComponentLayout>
        <funnel.Render
          consent={({ context }) => (
            <ConsentStep
              consent={context.consent}
              onConsentChange={(value) => {
                funnel.history.replace("consent", { consent: value });
              }}
            />
          )}
          personalInfo={({ context }) => (
            <PersonalInfoStep
              initialData={{
                name: context.name,
                email: context.email,
                phone: context.phone,
              }}
              onSubmit={(data) => {
                funnel.history.replace("personalInfo", {
                  ...context,
                  ...data,
                });
              }}
              onValidityChange={setIsPersonalInfoValid}
            />
          )}
          position={({ context }) => (
            <PositionStep
              selectedPosition={context.position}
              onSubmit={(position) => {
                funnel.history.replace("position", {
                  ...context,
                  position,
                });
              }}
            />
          )}
        />
      </ComponentLayout>

      <ComponentLayout>
        <div className="flex justify-between">
          <Button
            variant="primary"
            width="80px"
            disabled={funnel.step === "consent"}
            onClick={() => funnel.history.back()}
          >
            뒤로
          </Button>
          <Button
            variant="primary"
            width="80px"
            onClick={handleNextClick}
            disabled={
              (funnel.step === "consent" &&
                funnel.context.consent !== "true") ||
              (funnel.step === "personalInfo" && !isPersonalInfoValid) ||
              (funnel.step === "position" && !funnel.context.position)
            }
          >
            {funnel.step === "position" ? "제출" : "다음"}
          </Button>
        </div>
      </ComponentLayout>
    </PageLayout>
  );
};

export default ApplyPage;
