import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        password:
 *          type: string
 *        bearName:
 *          type: string
 *        level:
 *          type: Number
 *        cotton:
 *          type: Number
 *        height:
 *          type: Number
 *        sex:
 *          type: string
 *        age:
 *          type: Number
 *        occupation:
 *          type: string
 *        myTopics:
 *          type: array
 *          items:
 *            type: string
 *
 */

/**
 * @swagger
 * components:
 *    User_req:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        password:
 *          type: string
 *
 */

// 회원가입

/**
 * @swagger
 *
 * /user/register:
 *  post:
 *    summary: "유저 등록"
 *    description: "POST 방식으로 유저를 등록한다."
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 */

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const myTopics = req.body.myTopics;
    const bearName = req.body.bearName;
    const sex = req.body.sex;
    const age = req.body.age;
    const occupation = req.body.occupation;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
      myTopics,
      bearName,
      sex,
      age,
      occupation,
      infoProvider: 'User',
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 *
 * /user/login:
 *  post:
 *    summary: "유저 로그인"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */

// 로그인
userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 *
 * /user/google-login:
 *  post:
 *    summary: "유저 구글로그인"
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                  type: string
 */
userAuthRouter.post('/user/google-login', async function (req, res, next) {
  try {
    const { token } = req.body;

    const user = await userAuthService.socialLoginBy(token);
    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * paths:
 *  /userlist:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/User'
 */

//userlist 반환
userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

//사용자 정보 반환
userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *    summary: "유저 수정"
 *    description: "PUT 방식을 통해 유저 수정(전체 데이터를 수정할 때 사용함)"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 수정
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      "200":
 *        description: user 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/User'
 */

//user 정보 수정
userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const myTopics = req.body.myTopics ?? null;
      const bearName = req.body.bearName ?? null;
      const level = req.body.level ?? null;
      const cotton = req.body.cotton ?? null;
      const height = req.body.height ?? null;
      const sex = req.body.sex ?? null;
      const age = req.body.age ?? null;
      const occupation = req.body.occupation ?? null;

      const toUpdate = {
        name,
        email,
        password,
        myTopics,
        bearName,
        level,
        cotton,
        height,
        sex,
        age,
        occupation,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({
        user_id,
        toUpdate,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 유저 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 */

//user 정보 반환
userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    summary: "유저 삭제"
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 유저 삭제
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              $ref: '#components/schemas/User'
 *    responses:
 *      "200":
 *        description: user 삭제 성공
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/User'
 */

//user 삭제 컴포넌트
userAuthRouter.delete(
  "/users/:id",
  //login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      //유저 삭제하는 메소드 호출
      await userAuthService.deleteUser({ user_id });

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

/**
 * @swagger
 * /bear/{id}:
 *  get:
 *    summary: "특정 유저 bear 정보 조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 유저 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                bearName:
 *                  type: string
 *                level:
 *                  type: Number
 *                cotton:
 *                  type: Number
 *                height:
 *                  type: Number
 */
// 곰 정보 찾기
userAuthRouter.get(
  '/bear/:id',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const bearInfo = await userAuthService.getBearInfo({ user_id });
      if (bearInfo.errorMessage) {
        throw new Error(bearInfo.errorMessage);
      }
      res.status(200).send(bearInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
