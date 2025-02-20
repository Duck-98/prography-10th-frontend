# Prography 10기 과제 제출

#### 제출자 : 나덕경

## 주요 기술 스택

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM

## 프로젝트 실행 방법

```bash
yarn
yarn dev
```

## 프로젝트 구조 및 설계 철학

### 컴포넌트 설계

#### 레이아웃 컴포넌트

- `PageLayout`: 전체 페이지의 기본 레이아웃을 담당
- `ComponentLayout`: 내부 컴포넌트들의 일관된 스타일링 제공
- `StepLayout`: 각 단계별 폼의 레이아웃 통일성 유지

#### 공통 컴포넌트

- `Button`: 재사용 가능한 버튼 컴포넌트
- `Input`: 폼 입력 필드 컴포넌트
- `Radio`: 라디오 버튼 그룹 컴포넌트
- `Loading`: 다양한 로딩 상태 표시 컴포넌트

### 3. 상태 관리 및 유효성 검증

- `usePersonalInfoForm` 커스텀 훅을 통한 폼 상태 관리
- 실시간 유효성 검증 구현
- 각 필드별 에러 메시지 표시

### 4. 성능 최적화

- React.lazy()를 통한 코드 스플리팅
- Suspense를 활용한 로딩 상태 관리
- 컴포넌트 최적화를 위한 메모이제이션 적용

### 5. 사용자 경험 개선

- 반응형 디자인 구현
- 직관적인 진행 상태 표시
- 명확한 에러 메시지 제공
- 스켈레톤 로딩 구현

#### @use-funnel 라이브러리 선택 배경

1. **복잡한 상태 관리 단순화**

   - 지원서 작성 과정이 'consent → personalInfo → position' 3단계로 구성되어 있어, 각 단계별 상태와 유효성 검사가 필요했습니다.
   - `@use-funnel`은 각 단계별 타입 안전성을 보장하면서도, 상태 관리를 단순화할 수 있는 방법을 제공합니다.

2. **타입 안전성 보장**

   ```typescript
   type FunnelState = {
     consent: ConsentStepType;
     personalInfo: ConsentStepType & PersonalInfoStepType;
     position: ConsentStepType & PersonalInfoStepType & PositionStepType;
   };
   ```

   - 각 단계별로 필요한 데이터 타입을 명확하게 정의하고, 타입 상속을 통해 이전 단계의 데이터가 유지되도록 설계했습니다.
   - TypeScript와 결합하여 런타임 이전에 타입 오류를 감지할 수 있습니다.

3. **히스토리 관리 용이성**
   - 브라우저의 뒤로가기/앞으로가기를 자연스럽게 지원합니다.
   - `funnel.history.back()`과 같은 API를 통해 프로그래매틱한 네비게이션이 가능합니다.

## 주요 구현 특징

### 1. 단계별 상태 관리

```typescript
const funnel = useFunnel<FunnelState>({
  id: "apply-process",
  initial: {
    step: "consent",
    context: {},
  },
});
```

- 각 단계별 상태를 독립적으로 관리하면서도, 이전 단계의 데이터를 유지합니다.
- `context`를 통해 전체 폼 데이터를 관리하며, 각 단계별로 필요한 데이터만 접근 가능합니다.

### 2. 유효성 검사 구현

```typescript
const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(false);

// PersonalInfoStep에서의 실시간 유효성 검사
const usePersonalInfoForm = ({
  initialData,
  onSubmit,
  onValidityChange,
}: UsePersonalInfoFormProps) => {
  // ...validation logic
};
```

- 각 단계별로 독립적인 유효성 검사 로직을 구현했습니다.
- 커스텀 훅(`usePersonalInfoForm`)을 통해 폼 상태 관리와 유효성 검사 로직을 분리했습니다.
- 실시간 유효성 검사를 통해 사용자 경험을 개선했습니다.

### 3. 네비게이션 컨트롤

```typescript
const handleNextClick = () => {
  switch (funnel.step) {
    case "consent":
      if (funnel.context.consent) {
        funnel.history.push("personalInfo", {
          consent: funnel.context.consent,
        });
      }
      break;
    // ... other cases
  }
};
```

- 각 단계별 이동 조건을 명확하게 정의했습니다.
- 유효성 검사 결과에 따라 다음 단계 진행 여부를 제어합니다.

### 4. 컴포넌트 구조화

```typescript
<funnel.Render
  consent={({ context }) => (
    <ConsentStep
      consent={context.consent}
      onConsentChange={(value) => {
        funnel.history.replace("consent", { consent: value });
      }}
    />
  )}
  // ... other steps
/>
```

- `funnel.Render`를 사용하여 각 단계별 컴포넌트를 선언적으로 관리합니다.
- 각 단계별 컴포넌트는 독립적으로 구현되어 있어 유지보수가 용이합니다.

## 결론

`@use-funnel`을 활용한 다단계 폼 구현은 복잡한 상태 관리를 단순화하고, 타입 안전성을 보장하며, 사용자 경험을 개선하는데 효과적인 솔루션을 제공했습니다. 특히 각 단계별 데이터의 독립성을 유지하면서도 전체적인 상태 관리를 효율적으로 할 수 있기때문에 해당 라이브러리를 사용했습니다.

### 아쉬웠던 점

use-funnel 라이브러리를 next.js 버전으로만 사용해봐서 react-router-dom 버전으로 사용하는데 어려움이 있었습니다.
마지막에 지원서를 제출할 때

```typescript
const handleSubmit = (data: FunnelState["position"]) => {
  setLoading(true);
  console.log("제출 데이터>>>>>>>>>", data);
  setTimeout(() => {
    setLoading(false);
    window.location.replace("./apply/complete");
  }, 1000);
};
```

`window.location`가 아닌 초기엔 navigate 함수를 사용해서 페이지를 이동시키고 싶었지만 페이지 이동이 안되는 문제가 있었습니다.
예상되는 바로는 @use-funnel에 종속된 라이브러리인 react-router-dom과 충돌이 나서 라우팅이 제대로 되지 않는 것으로 예상이 됩니다.

그래서 임시로 `window.location`을 사용해서 페이지를 이동시켰습니다.
저 문제는 use-funnel 라이브러리 자체의 문제인지 확인하고자 issue를 남길 예정입니다.
