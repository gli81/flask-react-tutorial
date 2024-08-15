# -*- coding: utf-8 -*-

from .. import db
from sqlalchemy.orm import Mapped, mapped_column


class User(db.Model):
    """
    
    """
    id: "Mapped[int]" = mapped_column(primary_key=True)
    username: "Mapped[str]" = mapped_column(unique=True)
    email: "Mapped[str]" = mapped_column()
    password: "Mapped[str]" = mapped_column(db.Text())

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
