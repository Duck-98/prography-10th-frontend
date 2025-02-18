import { useFunnel } from "@use-funnel/react-router-dom";
import { StepHeader } from "@/components/Steps/StepHeader";
import PageLayout from "@/layouts/PageLayout";
import ComponentLayout from "@/layouts/ComponentLayout";
import Button from "@/components/common/Button";
import { ConsentStep } from "@/components/Steps/ConsentStep";
import { PersonalInfoStep } from "@/components/Steps/PersonalInfoStep";
import { PositionStep } from "@/components/Steps/PositionStep";

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

const ApplyPage = () => {
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
    // TODO: 최종 제출 로직 구현
    console.log("Final submission:", data);
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
          funnel.context.phone
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

  console.log(funnel.context, "context");
  return (
    <PageLayout>
      <ComponentLayout className="mb-6">
        <div className="flex justify-center">
          <div className="text-3xl font-bold">Prography 10기 지원서</div>
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
              onBack={() => funnel.history.back()}
            />
          )}
          position={({ context }) => (
            <PositionStep
              initialPosition={context.position}
              onSubmit={(position) => handleSubmit({ ...context, position })}
              onBack={() => funnel.history.back()}
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
              (funnel.step === "consent" && !funnel.context.consent) ||
              (funnel.step === "personalInfo" &&
                (!funnel.context.name ||
                  !funnel.context.email ||
                  !funnel.context.phone)) ||
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
