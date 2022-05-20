import express from 'express';
import { swaggerUi, specs } from './utils/swagger';
import cors from 'cors';
import { userAuthRouter } from './routers/userRouter';
import { dataRouter } from './routers/dataRouter';
import { talkRouter } from './routers/talkRouter';
import { viewHistoryRouter } from './routers/viewHistoryRouter';
import { likeRouter } from './routers/likeRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { bookmarkRouter } from './routers/bookmarkRouter';
import { commentRouter } from './routers/commentRouter';
import { createClient } from 'redis';
import axios from 'axios';

const app = express();

// swagger setting
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const client=createClient()

async function run(){
    await client.connect()
}

run()

async function setVal(key, value, expireSeconds){
    await client.set(key, value, 
      {
        EX: expireSeconds,
        NX: true
      }
    )
}

async function getVal(key){
    return await client.get(key)
}

//기본 페이지
app.get('/', (req, res) => {
  res.send('TeDdy Bear 서비스입니다!');
});

const cacheHit = async (req, res, next) => {
  const value = await getVal(req.url)
  if (value == null) {
    next();
  } else {
    res.send(value);
  }
};

app.get('/cache/test', cacheHit, async (req, res) => {
  try {
    const universityInfo = await axios.get('http://universities.hipolabs.com/search?name=university&country=turkey');

    const universityData = universityInfo.data;
    await setVal(req.url, JSON.stringify(universityData), 10);

    return res.json(universityData);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

app.use(userAuthRouter);
app.use(dataRouter);
app.use(talkRouter);
app.use(viewHistoryRouter);
app.use(likeRouter);
app.use(bookmarkRouter);
app.use(commentRouter);

app.use(errorMiddleware);

export { app };
