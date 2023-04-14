/* eslint-disable no-useless-escape */
import { useCallback } from 'react';

import { ErrorType } from '@components/common/inputs/type';

export interface ValidOnlyErr {
  txt: string;
  error:
    | React.Dispatch<React.SetStateAction<ErrorType>>
    | ((props: ErrorType) => void);
}

export interface ValidInterface extends ValidOnlyErr {
  pass: React.Dispatch<React.SetStateAction<string>> | ((txt: string) => void);
}

export class Validation {
  regExAuthNumder: RegExp;
  regExpPhoneNumber: RegExp;
  regBusinessNumber: RegExp;
  regExNumberOnly: RegExp;
  regExpNum: RegExp;
  regExpEmail: RegExp;
  regExpMobile: RegExp;
  regExpPhone: RegExp;
  regExpPhoneEight: RegExp;
  regExpBusinessNum: RegExp;
  regExpId: RegExp;
  regExpIdEnglishOnly: RegExp;
  regExpIdNumberOnly: RegExp;
  regExpIdCheck: RegExp;
  regExpPassword: RegExp;
  regPwFormChack: RegExp;
  regExpImage: RegExp;
  regExpFile: RegExp;
  regExFaxNumber: RegExp;
  regNameKo: RegExp;
  regPharmacyName: RegExp;
  regAddressDetail: RegExp;
  regRefusalDispensing: RegExp;
  regRefusal: RegExp;
  regExpExpenses: RegExp;
  regExpBirthDate: RegExp;
  regExpBirthDateOn: RegExp;

  constructor() {
    // 인증 번호 유효성 정규식
    this.regExAuthNumder = /^[0-9-]{0,6}$/;

    // 일반 전화번호 유효성 정규식 입력
    this.regExpPhoneNumber = /^[0-9-]{0,15}$/;

    /** 일반 전화번호 정규식 */
    this.regExpPhone = /^(\d{2,4})(\d{3,4})(\d{4})$/;
    this.regExpPhoneEight = /^(\d{4})(\d{4})$/;

    /**한글만 입력 받기 */
    this.regNameKo = /^[ㄱ-ㅎ|가-힣]{0,5}$/;

    /** 유저 아이디 정규식*/
    this.regExpId = /^[a-z0-9]{0,20}$/;
    this.regExpIdEnglishOnly = /^[a-z]*$/;
    this.regExpIdNumberOnly = /^[0-9]*$/;
    this.regExpIdCheck = /^[a-z0-9]{4,20}$/;

    /** 비밀번호 정규식 최대 16자의 영문 대소문자, 숫자, 특수문자 입력 정규식*/
    this.regExpPassword =
      /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{0,16}$/;

    /** 비밀번호 정규식 전체 형식 체크*/
    this.regPwFormChack =
      /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]))[0-9a-zA-Z!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]{8,16}$/;

    /**핸드폰 입력 확인 정규식*/
    this.regExpNum = /[^0-9]/g;

    /** 이메일 체크 정규식*/
    this.regExpEmail =
      /^[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*@[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*\.[a-zA-Z]{2,3}$/i;

    /**핸드폰번호 전체 형식 정규식*/
    this.regExpMobile = /^(^010)(\d{3,4})(\d{4})$/;

    /** 사업자 등록증 정규식 */
    this.regExpBusinessNum = /^(\d{3})(\d{2})(\d{5})$/;

    /** 진료비 입력 정규식 */
    this.regExpExpenses = /^[0-9,]{0,9}$/;

    /**거절 사유 한글 영어 숫자 20자*/
    this.regRefusal = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,20}$/;

    /**조제 거절 입력*/
    this.regRefusalDispensing = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,20}$/;

    /** 슷자만 확인 */
    this.regExNumberOnly = /^[0-9-]{0,15}$/;

    /** 슷자만 확인 */
    this.regBusinessNumber = /^[0-9-]{0,12}$/;

    /**팩스 유효성 정규식 */
    this.regExFaxNumber = /^[0-9]{0,11}$/;

    /**생년월일 포멧 확인 */
    this.regExpBirthDate =
      /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;

    /**생년월일 입력 확인 */
    this.regExpBirthDateOn = /^(\d{4})(\d{2})(\d{2})$/;

    /** 이미지 파일 정규식 */
    this.regExpImage = /pdf|jpg|jpeg|png/i;

    /** PDF 파일만 */
    this.regExpFile = /pdf/i;

    /**약국 이름 받기*/
    this.regPharmacyName = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;
    /**상세 주소 받기*/
    this.regAddressDetail = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;
  }
  /**모바일 번호 입력 형태 변경 및 체크 메소드*/
  mobileCheck(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length < 14) {
      if (txt.length > 3 && txt.substring(0, 3) !== '010') {
        error({
          msg: '앞에 3자리는 010이 들어가야합니다.',
          boo: true,
        });
        return;
      } else {
        pass(
          txt
            .replace(this.regExpNum, '')
            .replace(this.regExpMobile, `$1-$2-$3`),
        );
        error({
          msg: '',
          boo: false,
        });
      }
    }
  }

  authNumder(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length !== 0 && !this.regExAuthNumder.test(txt)) {
      error({
        msg: '숫자만 입력 가능합니다.',
        boo: true,
      });
      return;
    }
    pass(txt.replace(/[^0-9]/g, ''));
    error({
      msg: '',
      boo: false,
    });
  }
}

const useValidation = () => {
  const validationClass = useCallback(() => {
    return new Validation();
  }, []);

  const validation = validationClass();
  return validation;
};

export default useValidation;
