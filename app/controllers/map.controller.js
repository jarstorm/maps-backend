import BaseController from './base.controller';
import Map from '../models/map';

class MapController extends BaseController {

    whitelist = [
        'latitude',
        'longitude'
    ];

    // Middleware to populate map based on url param
    _populate = async(req, res, next) => {
        const { id } = req.params;

        try {
            const map = await Map.findById(id);

            if (!map) {
                const err = new Error('Post not found.');
                err.status = 404;
                return next(err);
            }

            req.map = map;
            next();
        } catch (err) {
            err.status = err.name === 'CastError' ? 404 : 500;
            next(err);
        }
    }

    search = async(req, res, next) => {
        try {
            const map =
                await Map.find({})
                .populate({ path: '_user', select: '-posts -role' });

            res.json(map);
        } catch (err) {
            next(err);
        }
    }

    /**
     * req.map is populated by middleware in routes.js
     */

    fetch = (req, res) => {
        res.json(req.map);
    }

    /**
     * req.user is populated by middleware in routes.js
     */
    create = async(req, res, next) => {
        const params = this.filterParams(req.body, this.whitelist);

        const map = new Map({
            ...params,
            _user: req.currentUser._id,
        });
        console.log(map);
        try {
            res.status(201).json(await map.save());
        } catch (err) {
            next(err);
        }
    }

    delete = async(req, res, next) => {
        /**
         * Ensure the user attempting to delete the map owns the map
         *
         * ~~ toString() converts objectIds to normal strings
         */
        if (req.map._user.toString() === req.currentUser._id.toString()) {
            try {
                await req.map.remove();
                res.sendStatus(204);
            } catch (err) {
                next(err);
            }
        } else {
            res.sendStatus(403);
        }
    }
}

export default new MapController();
