import { Router } from 'express';
import multer from 'multer';
import {
  createMusic,
  getAllMusic,
  getMusicById,
  getMusicByTitle,
  uploadMusic,
} from '../controllers/music.controller';

export const musicRouter = Router();
const upload = multer();

musicRouter.get('/', async (req, res) => {
  try {
    const music = await getAllMusic();
    res.status(200).json({ message: 'All music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.get('/:id', async (req, res) => {
  try {
    const music = await getMusicById(req.params.id);
    res.status(200).json({ message: 'Music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.get('/title', async (req, res) => {
  try {
    const music = await getMusicByTitle(req.query.title as string);
    res.status(200).json({ message: 'Music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.post('/', async (req, res) => {
  try {
    const music = await createMusic(req.body.title);
    res.status(201).json({ message: 'Music created successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.post('/upload', upload.single('music'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Music file is required');
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    const link = await uploadMusic(file);
    res.status(201).json({ message: 'Music created successfully', link });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// musicRouter.post('/album/upload', upload.array('music'), async (req, res) => {
//   try {
//     if (!req.files) throw new Error('Music files are required');
//     const files = req.files.map((file) => {
//       return new File([file.buffer], file.originalname, {
//         type: file.mimetype,
//       });
//     });
//     const links = await Promise.all(files.map((file) => uploadMusic(file)));
//     res.status(201).json({ message: 'Music created successfully', links });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// });
