import { useCallback } from 'react';

export class CodeMsgBundle {
  msg: string;
  constructor() {
    this.msg = 'msg';
  }
  public errMsg = (code: string) => {
    switch (code) {
      //Global Response Code
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
      // 인증
      case '0101':
        return '일치하는 계정 정보를 찾을 수 없습니다. \n 다시 확인 해주시길 바랍니다.';
      case '0102':
        return '패스워드가 일치하지 않습니다. \n 다시 입력하시길 바랍니다.';
      case '0120':
        return '이미 등록된 ID 입니다. \n 다시 입력하시길 바랍니다.';
      case '0121':
        return '병원 정보를 찾을 수 없습니다. \n 다시 입력하시길 바랍니다.';
      case '0130':
        return '이미 등록된 소셜 ID 입니다. \n 다시 입력하시길 바랍니다.';
      case '0140':
        return '이미 등록된 병원코드 입니다. \n 다시 입력하시길 바랍니다.';
      case '0190':
        return '인증번호가 일치하지 않습니다. \n 잠시 후, 다시 시도해 주세요';
      case '0191':
        return '검증코드가 일치하지 않습니다. \n 다시 입력하시길 바랍니다.';
      //토큰
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
      case '0048':
        return '요청하신 메소드에 접근 권한이 없습니다. ';
      case '0049':
        return '인증 정보가 없습니다.';

      case '7000':
        return '파일 변환중 에러가 발생했습니다.';
      case '7001':
        return '파일을 찾을 수 없습니다.';
      case '7002':
        return '파일 정보를 찾을 수 없습니다.';
      case '7003':
        return '패스 인증 정보를 찾을 수 없습니다.';
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

      //Hospital-Service Response Code
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
      // 외부 서비스
      case '9900':
        return '외부 연동 서비스에서 에러가 발생했습니다.\n 잠시후 다시 시도해주시길 바랍니다.';
      case '9901':
        return '외부 연동 서비스가 응답이 없습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '9902':
        return '다른 마이크로 서비스에서 에러가 발생했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
      case '9999':
        return '어디아파 서비스에서 장애가 발생했습니다. \n 잠시후 다시 시도해주시길 바랍니다.';
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