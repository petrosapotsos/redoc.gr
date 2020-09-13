const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Party = require('../models/Party');

// @desc    Show add page
// @route   GET /parties/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('parties/add');
});

// @desc    Show single party
// @route   GET /parties/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let party = await Party.findById(req.params.id).populate('user').lean();

    if (!party) {
      return res.render('error/404');
    }

    res.render('parties/show', {
      party,
    });
  } catch (err) {
    console.error(err);
    return res.render('error/404');
  }
});

// @desc    Process add form
// @route   POST /parties
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Party.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc    Show edit page
// @route   GET /parties/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const party = await Party.findOne({
      _id: req.params.id,
    }).lean();

    if (!party) {
      return res.render('error/404');
    }

    if (party.user != req.user.id) {
      res.render('/dashboard');
    } else {
      res.render('parties/edit', {
        party,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});

// @desc    Update party --> must update, not replace
// @route   PUT /parties/:id
// TODO : test
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let party = await Party.findById(req.params.id).lean();

    if (!party) {
      res.redirect('error/404');
    }

    if (party.user != req.user.id) {
      res.redirect('/parties');
    } else {
      Party.update({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.redirect('/dashboard');
    }
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});

// @desc   Delete party
// @route   DELETE /parties/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Party.remove({ _id: req.params.id });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    return res.render('error/500');
  }
});

module.exports = router;
