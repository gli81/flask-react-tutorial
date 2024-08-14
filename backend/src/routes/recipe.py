# -*- coding: utf-8 -*-

from flask import request
from flask_restx import Resource, fields, Namespace
from ..models.recipe import Recipe
from ..exts import db
from flask_jwt_extended import jwt_required

recipe_ns = Namespace(
    "Recipe",
    description="Namespace for recipes",
    path='/')

#model (serializer)
recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)


@recipe_ns.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"msg": "hello"}


@recipe_ns.route("/recipes")
class RecipesResource(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        """
        Get all recipes
        """
        recipes = db.session.execute(db.select(Recipe)).scalars().all()
        return recipes

    @jwt_required()
    @recipe_ns.marshal_with(recipe_model)
    def post(self):
        """
        Create a new recipe
        """
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get("title"),
            description = data.get("description")
        )
        new_recipe.save()
        return new_recipe, 201


@recipe_ns.route("/recipe/<int:id>")
class RecipeResource(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self, id):
        """
        Get a recipe by id
        """
        recipe = db.get_or_404(Recipe, id)
        return recipe

    @jwt_required()
    @recipe_ns.marshal_with(recipe_model)
    def put(self, id):
        """
        Update a recipe by id
        """
        recipe_to_update = db.get_or_404(Recipe, id)
        data = request.get_json()
        recipe_to_update.update(
            data.get("title"),
            data.get("description")
        )
        return recipe_to_update

    @jwt_required()
    @recipe_ns.marshal_with(recipe_model)
    def delete(self, id):
        """
        Delete a recipe by id
        """
        recipe_to_delete = db.get_or_404(id)
        recipe_to_delete.delete()
        return recipe_to_delete
