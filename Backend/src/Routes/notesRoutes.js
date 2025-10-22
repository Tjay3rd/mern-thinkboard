import express, {Router} from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote } from '../Controllers/notesController.js';

const app = express();
const router = Router();

app.use(express.json());


router.get('/',  getNotes)

router.get('/:id',  getNote)

router.post('/',  createNote);

router.patch('/:id',  updateNote);

router.delete('/:id', deleteNote);

export default router;
