export class CodeMsgBundle {
  msg: string;
  constructor() {
    this.msg = 'msg';
  }
  public errMsg = (code: string) => {
    switch (code) {
      /** global code  [0000~0999][9000~9999]**/
      case '0010':
        return '필수 값을 입력하시지 않았습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0011':
        return '형식이 다른 값을 입력 하셨습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0012':
        return '잘못된 요청입니다. \n 다시 확인 해주시길 바랍니다.';
      case '0013':
        return '잘못된 값이 입력 하였습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0014':
        return '잘못된 enum 값을 입력 하였습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0020':
        return '전송된 파일이 없습니다 \n 잠시후 다시 시도해주시길 바랍니다.';
      case '0021':
        return '지원하지 않는 파일 형식입니다. \n 파일 확장자를 다시 확인해주세요';
      case '0022':
        return '필수 값을 입력하시지 않았습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0023':
        return '입력하지 않은 값이 있습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0024':
        return '시작일과 종료일 둘 다 있어야 합니다. \n 다시 확인 해주시길 바랍니다.';
      case '0025':
        return '직접 입력 선택시 내용은 반드시 있어야 합니다. \n 다시 확인 해주시길 바랍니다.';
      case '0026':
        return '서비스 이용을 위해서는 동의가 필요합니다. \n 다시 확인 해주시길 바랍니다.';
      case '0027':
        return '잘못된 파일 ULID 또는, 파일에 접근할 수 있는 사용자가 아닙니다. \n 다시 확인 해주시길 바랍니다.';
      case '0999':
        return '지원하지 않는 기능입니다. \n 다시 확인 해주시길 바랍니다.';

      /* authentication & authorization [40~49]*/
      case '0040':
        return 'JWT 토큰의 서명이 일치하지 않습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '0041':
        return '유효하지 않은 형식의 토큰입니다.';
      case '0042':
        return '인증기간이 만료된 토큰입니다.';
      case '0043':
        return '지원하지 않는 형식의 토큰입니다.';
      case '0044':
        return '토큰의 클라임 없습니다.';
      case '0045':
        return 'Refresh Token의 유효기간이 만료되었습니다.';
      case '0048':
        return '요청하신 메소드에 접근 권한이 없습니다. ';
      case '0049':
        return '인증 정보가 없습니다.';

      case '0050':
        return '가입 승인 대기중인 계정입니다. \n 다시 확인 해주시길 바랍니다.';
      case '0051':
        return '휴면 계정입니다. \n 다시 확인 해주시길 바랍니다.';
      case '0055':
        return '운영팀에 의해 정지된 계정입니다. \n 다시 확인 해주시길 바랍니다.';
      case '0056':
        return '병원 관리자에 의해 정지된 계정입니다. \n 다시 확인 해주시길 바랍니다.';
      case '0057':
        return '이미 사용 중인 휴대폰 번호입니다. \n 다시 확인 해주시길 바랍니다.';

      /* server error */
      case '9900':
        return '외부 연동 서비스에서 에러가 발생했습니다.\n 잠시후 다시 시도해주시길 바랍니다.';
      case '9901':
        return '외부 연동 서비스가 응답이 없습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '9902':
        return '다른 마이크로 서비스에서 에러가 발생했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '9999':
        return '어디아파 서비스에서 장애가 발생했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';

      /** auth-server code [0100~0199] **/

      /* account [00~09]*/
      case '0101':
        return '일치하는 계정 정보를 찾을 수 없습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0102':
        return '패스워드가 일치하지 않습니다. \n 다시 입력하시길 바랍니다.';
      /* hospital account [20~29] */
      case '0120':
        return '이미 등록된 ID 입니다. \n 다시 입력하시길 바랍니다.';
      case '0121':
        return '병원 정보를 찾을 수 없습니다. \n 다시 입력하시길 바랍니다.';
      /* user account [30~39] */
      case '0130':
        return '이미 등록된 소셜 ID 입니다. \n 다시 입력하시길 바랍니다.';
      /* hospital [40~49] */
      case '0140':
        return '이미 등록된 병원코드 입니다. \n 다시 입력하시길 바랍니다.';
      case '0145':
        return '보안 설정 정보를 찾을 수 없습니다. \n 다시 입력하시길 바랍니다.';
      case '0149':
        return '이미 승인된 병원입니다. \n 다시 입력하시길 바랍니다.';

      /* pharmacy account [50~59] */

      /* pharmacy [60~69] */
      case '0160':
        return '약국 정보를 조회하지 못했습니다. \n 다시 입력하시길 바랍니다.';
      /* mobile authentication [90~99]*/
      case '0190':
        return '인증번호가 일치하지 않습니다. \n 잠시 후, 다시 시도해 주세요';
      case '0191':
        return '검증코드가 일치하지 않습니다. \n 다시 입력하시길 바랍니다.';

      /** hospital-service code [1000~1099] **/
      case '1000':
        return '유효하지 않은 진료과 코드입니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1001':
        return '병원 프로필 생성중 오류가 발생했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1010':
        return '병원 프로필을 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1011':
        return '비급여 항목을 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1020':
        return '의사 프로필을 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1021':
        return '의사 설정을 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '1030':
        return '진료지원 프로필을 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';

      /** pharmacy-service code [2000~2099] **/
      /** hospital-service code [1000~1099] **/
      case '2000':
        return '약국 프로필을 조회하지 못했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '2020':
        return '배송 가능한 약국을 찾지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '2021':
        return '처방전이 등록되지 않은 진료건입니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '2022':
        return '이미 조제 진행중인 처방전 입니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '2029':
        return '유효하지 않은 비대면진료 입니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      /* send prescription by fax */
      case '2030':
        return '처방전을 조회하지 못했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      /* user order to medicine */
      case '2040':
        return '등록된 기본 주소지가 없습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      /* medicine order request */

      case '2050':
        return '주문건을 찾지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      /* medicine payment */

      case '2061':
        return '조제비 결제에 실패했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '2062':
        return '배송비 결제에 실패했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';

      case '3000':
        return '기본건강정보를 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '3010':
        return '주소 정보를 조회하지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';

      /** backoffice-service code [4000~4099] **/
      case '4000':
        return '공지사항을 찾지 못 했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';

      /** proxy-service code [7000~7099] **/
      case '7000':
        return '파일 변환중 에러가 발생했습니다.';
      case '7001':
        return '파일을 찾을 수 없습니다.';
      case '7002':
        return '파일 정보를 찾을 수 없습니다.';
      case '7003':
        return '패스 인증 정보를 찾을 수 없습니다.';
      /* nine module [10~19] */
      case '7010':
        return '실명인증 모듈에서 오류가 발생했습니다.';
      case '7011':
        return 'PASS 모듈에서 오류가 발생했습니다.';
      /* firebase cloud message [20~29] */
      case '7020':
        return '잘못된 요청 코드 입니다.';
      /* kakao-mobility [30~39] */
      case '7030':
        return '주문을 찾을 수 없습니다.';

      /* nine module [10~19] */
      case '7100':
        return '비대면 진료실 정보를 조회하지 못 했습니다.';
      case '7101':
        return '의사 프로필을 조회하지 못 했습니다.';
      case '7102':
        return '진료 설정이 완료되지 않았습니다.';
      case '7103':
        return '의사가 진료중인 상태가 아닙니다.';
      case '7104':
        return '진행중인 진료접수신청서가 있습니다.';
      case '7105':
        return '진료접수신청서를 찾을 수 없습니다.';
      case '7106':
        return 'REGIST 상태인 접수신청서만 수락/거절 할 수 있습니다, 현재 상태';
      case '7107':
        return '진행중인 비대면 진료를 찾을 수 없습니다.';
      case '7108':
        return '취소 가능한 상태의 비대면진료가 아닙니다.';
      case '7109':
        return '환자등록번호가 없습니다. 먼저 등록해주세요.';
      case '7110':
        return '대기중인 비대면 진료를 찾을 수 없습니다.';
      case '7111':
        return '비대면 진료를 찾을 수 없습니다.';
      case '7112':
        return '진료시작 가능한 상태의 비대면진료가 아닙니다 현재 진료 상태.';
      case '7113':
        return '종료 가능한 상태의 비대면진료가 아닙니다.';
      case '7114':
        return '이미 처방전 및 진료비가 입력된 비대면 진료입니다.';
      case '7115':
        return '종료 되지 않은 비대면 진료입니다.';
      case '7116':
        return '진료소 대기열이 가득차서 더이상 예약이 불가능합니다.';
      case '7117':
        return '보류 가능한 상태의 비대면진료가 아닙니다.';
      case '7118':
        return '진료비 결제 정보를 조회 할 수 없습니다.';
      case '7119':
        return '진료비 미결제건이 없습니다.';
      case '7120':
        return '진료비 주문정보를 찾을 수 없습니다.';
      case '7121':
        return '진료비 수정 가능 시간을 초과했습니다.';
      case '7122':
        return '진료중인 비대면 진료가 있습니다.';
      /** payment-service code [7200~7299] **/
      /* payment card into [00~09]*/
      case '7200':
        return '이미 등록된 카드 번호입니다.';
      case '7201':
        return '유효하지 않은 카드 정보입니다.';
      case '7202':
        return '카드정보를 찾을 수 없습니다.';
      case '7203':
        return '주 결제카드를 찾을 수 없습니다.';
      /* payment info [10~19]*/
      case '7210':
        return '결제정보를 찾을 수 없습니다.';
      case '7220':
        return '주문정보를 찾을 수 없습니다.';
      case '7230':
        return '최소 결제 금액은 100원 이상입니다.';
      case '7231':
        return '결제 정보가 일치하지 않습니다.';
      case '7239':
        return '결제도중 오류가 발생했습니다.';
      default:
        return '잘못된 요청입니다. \n 잠시후 다시 시도해주시길 바랍니다.';
    }
  };
}

const useCodeMsgBundle = () => {
  const codeMsg = new CodeMsgBundle();
  return codeMsg;
};

export default useCodeMsgBundle;
